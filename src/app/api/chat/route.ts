import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  findOrCreateUniversity,
  addToShortlist,
} from "@/lib/university-service";

const SYSTEM_INSTRUCTION = `
You are the ScholrAI Counsellor.
Your goal is to help students with study abroad plans.
You have access to tools to help the student directly.

TOOL USAGE FORMAT:
To use a tool, you MUST output a valid JSON object in the following format and NOTHING else:
{
  "tool": "tool_name",
  "args": {
    "key": "value"
  }
}

AVAILABLE TOOLS:
- Tool Name: "add_to_shortlist"
  - Description: Adds a university to the user's shortlist. Use when user says "Add [University]" or "I like [University]".
  - Args: "universityName" (string)

- Tool Name: "lock_university"
  - Description: Locking a university triggers advanced tasks. Use ONLY if user explicitly wants to "Lock" or "Finalize".
  - Args: "universityName" (string)

GUIDELINES:
- Be concise, direct, and conversational.
- DO NOT repeat generic greetings like "Hello" or "Hi" in every response.
- Use the student's name naturally and sparsely; do not over-address them.
- If NO tool is needed, simply reply with a helpful text response.
- Do NOT output the tool JSON if you are just chatting.
- If the tool succeeds, subsequent messages will inform you.
`;

export async function POST(req: Request) {
  try {
    if (!process.env.HUGGINGFACE_API_KEY) {
      console.error("Missing HUGGINGFACE_API_KEY");
      return NextResponse.json(
        { error: "Configuration Error" },
        { status: 500 },
      );
    }

    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      message,
      messages = [],
      sessionId,
      personality = "friendly",
      stream: shouldStream = true,
    } = await req.json();

    // Context fetching: Profile + Shortlist
    const profile = await prisma.profile.findUnique({
      where: { userId: session.userId },
      include: { user: true },
    });

    const shortlist = await prisma.shortlist.findMany({
      where: { userId: session.userId },
      include: { university: true },
    });

    const lockedUni = shortlist.find((s: any) => s.isLocked);
    const shortlistNames = shortlist
      .map((s: any) => s.university.name)
      .join(", ");

    const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

    // Save user message to DB if session exists
    // Create session if it doesn't exist
    let currentSessionId = sessionId;
    let dbMessages: any[] = [];

    if (!currentSessionId) {
      // Create new session
      const newSession = await prisma.chatSession.create({
        data: {
          userId: session.userId,
          title: message.substring(0, 30) + (message.length > 30 ? "..." : ""),
          personality,
          messages: JSON.stringify([]),
        },
      });
      currentSessionId = newSession.id;
      dbMessages = [];

      // Save user message immediately
      dbMessages.push({ role: "user", content: message });
      await prisma.chatSession.update({
        where: { id: currentSessionId },
        data: {
          messages: JSON.stringify(dbMessages),
        },
      });
    } else {
      // Load existing session
      const chatSession = await prisma.chatSession.findUnique({
        where: { id: currentSessionId },
      });
      if (chatSession) {
        dbMessages = JSON.parse(chatSession.messages);
        dbMessages.push({ role: "user", content: message });
        await prisma.chatSession.update({
          where: { id: currentSessionId },
          data: {
            messages: JSON.stringify(dbMessages),
            updatedAt: new Date(),
          },
        });
      }
    }

    // Personality Prompt Adjustment
    let personalityInstruction = "";
    switch (personality) {
      case "strict":
        personalityInstruction =
          "ROLE: Mock Interviewer & Critic.\n" +
          "TONE: Strict, Professional, Challenging, Direct.\n" +
          "INSTRUCTION: You are conducting a high-stakes university interview. Do NOT be nice. Do NOT offer encouragement. Challenge every vague statement the student makes. Ask deep, probing follow-up questions. Point out weaknesses in their profile brutally but constructively. Your goal is to prepare them for the toughest scrutiny.";
        break;
      case "professional":
        personalityInstruction =
          "ROLE: Strategic Admission Consultant.\n" +
          "TONE: Formal, Objective, Analytical, Concise.\n" +
          "INSTRUCTION: Focus purely on data, requirements, and strategy. Do not use emotional language. Analyze their cohesive application strategy. Provide specific, actionable steps to improve acceptance chances based on their stats. Be efficient and business-like.";
        break;
      default: // friendly
        personalityInstruction =
          "ROLE: Supportive Mentor.\n" +
          "TONE: Warm, Encouraging, Casual, Empathetic.\n" +
          "INSTRUCTION: Act like a supportive mentor. Validate their concerns before offering advice. Focus on building their confidence while guiding them gently.";
        break;
    }

    const contextString = `
      USER CONTEXT:
      - Name: ${profile?.user.fullName || "Student"}
      - Target Degree: ${profile?.targetDegree}
      - GPA: ${profile?.gpa}
      - Target Major: ${profile?.targetMajor || "Not specified"}
      - Current Shortlist: ${shortlistNames || "Empty"}
      - Locked University: ${lockedUni?.university.name || "None"}
      - Current Stage: ${profile?.currentStage || "PROFILE"}

      PERSONALITY: ${personalityInstruction}
    `;

    // Construct History for Qwen
    // Use DB history if available, otherwise fallback to request messages
    // Note: Request messages usually contain the full history in client state
    const historyToUse =
      currentSessionId && dbMessages.length > 0 ? dbMessages : messages;

    let chatHistory = historyToUse
      .filter(
        (m: any) =>
          m.role === "user" || m.role === "assistant" || m.role === "system",
      )
      .map((m: any) => ({
        role: m.role,
        content: m.content,
      }));

    // Exclude the last message if it was just added to DB to avoid double counting?
    // Actually if we use dbMessages, it INCLUDES the latest user message.
    // If we use 'messages' from client, it usually includes it too.
    // We need to ensure we don't duplicate the last user message if we construct the array manually.
    // Simplifying: Just use what we have. API usually expects last message in 'messages' array OR separate 'content'.
    // HuggingFace's chatCompletion expects the full conversation history.

    const fullMessages = [
      { role: "system", content: SYSTEM_INSTRUCTION + contextString },
      ...chatHistory,
    ];

    // Ensure the last message is indeed the user's latest input
    if (
      fullMessages[fullMessages.length - 1].role !== "user" &&
      fullMessages[fullMessages.length - 1].content !== message
    ) {
      fullMessages.push({ role: "user", content: message });
    }

    if (!shouldStream) {
      const response = await hf.chatCompletion({
        model: "Qwen/Qwen2.5-72B-Instruct",
        messages: fullMessages,
        max_tokens: 500,
        temperature: 0.7,
      });

      const reply = response.choices[0].message.content;

      // Save AI reply to DB
      if (currentSessionId) {
        dbMessages.push({ role: "assistant", content: reply });
        await prisma.chatSession.update({
          where: { id: currentSessionId },
          data: { messages: JSON.stringify(dbMessages) },
        });
      }

      return NextResponse.json({ reply, sessionId: currentSessionId });
    }

    const stream = hf.chatCompletionStream({
      model: "Qwen/Qwen2.5-72B-Instruct",
      messages: fullMessages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    let isToolCall = false;
    let buffer = "";
    let fullAiResponse = ""; // Accumulate for DB save

    const customStream = new ReadableStream({
      async start(controller) {
        try {
          let buffer = "";
          let isToolCall = false;
          let isPlainMessage = false;
          let hasDecided = false;

          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (!content) continue;

            fullAiResponse += content;

            if (hasDecided) {
              if (isToolCall) {
                buffer += content; // Keep buffering for valid JSON parsing at end
              } else {
                controller.enqueue(encoder.encode(content)); // Stream directly
              }
              continue;
            }

            // Still deciding...
            buffer += content;
            const trimmed = buffer.trimStart();

            if (trimmed.length === 0) {
              continue; // Still only whitespace
            }

            // Simple heuristic: if it looks like JSON or Markdown-JSON, it's a tool
            // Check for { or ```
            if (trimmed.startsWith("{") || trimmed.startsWith("```")) {
              isToolCall = true;
              hasDecided = true;
            } else {
              // It's a normal message
              isPlainMessage = true;
              hasDecided = true;
              // Flush what we buffered
              controller.enqueue(encoder.encode(buffer));
              buffer = ""; // Clear buffer to save memory, though we don't need it for plain msgs
            }
          }

          if (isToolCall) {
            try {
              // Extract JSON from buffer (handle markdown wrapper)
              // Match first '{' to last '}'
              const jsonMatch = buffer.match(/\{[\s\S]*"tool"[\s\S]*\}/);

              if (jsonMatch) {
                const toolData = JSON.parse(jsonMatch[0]);

                if (toolData.tool === "add_to_shortlist") {
                  const uniName = toolData.args.universityName;
                  const result = await addToShortlist(session.userId, uniName);

                  let outputMessage = "";
                  if (result.status === "success") {
                    outputMessage = `✅ I've added **${result.university.name}** to your shortlist.`;
                  } else if (result.status === "already_exists") {
                    outputMessage = `ℹ️ **${result.university.name}** is already in your shortlist.`;
                  } else {
                    outputMessage = `❌ I couldn't find "${uniName}". Please check the spelling.`;
                  }

                  controller.enqueue(encoder.encode(outputMessage));
                  fullAiResponse = outputMessage;
                } else if (toolData.tool === "lock_university") {
                  // Handle future tools if needed, or just standard acknowledgment
                  const uniName = toolData.args.universityName;
                  controller.enqueue(
                    encoder.encode(
                      `🔐 Locking **${uniName}** and analyzing next steps...`,
                    ),
                  );
                  fullAiResponse = `🔐 Locking **${uniName}** and analyzing next steps...`;
                }
              } else {
                // Formatting looked like tool but valid JSON not found
                // Just send the raw buffer so user sees something
                controller.enqueue(encoder.encode(buffer));
              }
            } catch (e) {
              console.error("Tool Execution Error:", e);
              controller.enqueue(encoder.encode(buffer));
            }
          } else if (!hasDecided && buffer.length > 0) {
            // Edge case: Stream ended before we decided (e.g. just whitespace)
            controller.enqueue(encoder.encode(buffer));
          }

          // Save full conversation to DB after stream ends
          if (currentSessionId && fullAiResponse) {
            dbMessages.push({ role: "assistant", content: fullAiResponse });
            await prisma.chatSession.update({
              where: { id: currentSessionId },
              data: { messages: JSON.stringify(dbMessages) },
            });
          }

          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(customStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error: any) {
    console.error("Chat Error:", error);
    return NextResponse.json({
      reply: "I am having trouble connecting to my new brain (Hugging Face).",
    });
  }
}
