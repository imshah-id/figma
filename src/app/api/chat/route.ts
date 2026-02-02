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
    let dbMessages = [];
    if (sessionId) {
      const chatSession = await prisma.chatSession.findUnique({
        where: { id: sessionId },
      });
      if (chatSession) {
        dbMessages = JSON.parse(chatSession.messages);
        dbMessages.push({ role: "user", content: message });
        await prisma.chatSession.update({
          where: { id: sessionId },
          data: {
            messages: JSON.stringify(dbMessages),
            updatedAt: new Date(),
          },
        });
      }
    } else {
      // If no ID, we rely on client sent history for context (temporary)
      // or we could enforce creating a session first.
      // ideally the client creates a session first, or we create one here.
    }

    // Personality Prompt Adjustment
    let personalityInstruction = "";
    switch (personality) {
      case "strict":
        personalityInstruction =
          "You are a Strict Interviewer. Be critical, concise, and professional. Ask tough questions about the student's choices. Do not offer encouragement.";
        break;
      case "professional":
        personalityInstruction =
          "You are a Professional Counsellor. Be formal, objective, and structured. Focus on facts and requirements.";
        break;
      default: // friendly
        personalityInstruction =
          "You are a Friendly Mentor. Be encouraging, warm, and helpful. Use emojis occasionally.";
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
      sessionId && dbMessages.length > 0 ? dbMessages : messages;

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
      if (sessionId) {
        dbMessages.push({ role: "assistant", content: reply });
        await prisma.chatSession.update({
          where: { id: sessionId },
          data: { messages: JSON.stringify(dbMessages) },
        });
      }

      return NextResponse.json({ reply });
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
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (!content) continue;

            fullAiResponse += content;

            // First chunk detection for Tool Call
            if (buffer === "" && content.trim().startsWith("{")) {
              isToolCall = true;
            }

            if (isToolCall) {
              buffer += content;
            } else {
              controller.enqueue(encoder.encode(content));
            }
          }

          if (isToolCall) {
            // Process the buffered tool call
            const jsonMatch = buffer.match(/\{[\s\S]*"tool"[\s\S]*\}/);
            // ... (existing tool logic) ...
            if (jsonMatch) {
              // ... (existing tool logic) ...
            } else {
              controller.enqueue(encoder.encode(buffer));
            }
          }

          // Save full conversation to DB after stream ends
          if (sessionId && fullAiResponse) {
            // Re-fetch to ensure we have latest state (though we are only writer usually)
            // simplified: assume sequential
            dbMessages.push({ role: "assistant", content: fullAiResponse });
            await prisma.chatSession.update({
              where: { id: sessionId },
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
