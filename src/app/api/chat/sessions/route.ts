import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "20");

    // Fetch User Sessions (Ordered by Most Recent)

    const chatSessions = await prisma.chatSession.findMany({
      where: { userId: session.userId },
      orderBy: { updatedAt: "desc" },
      take: limit,
      // select: {
      //   id: true,
      //   title: true,
      //   updatedAt: true,
      //   // personality: true,
      // },
    });

    return NextResponse.json({ sessions: chatSessions });
  } catch (error) {
    console.error("Fetch Sessions Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { personality = "friendly" } = await req.json();

    const newSession = await prisma.chatSession.create({
      data: {
        userId: session.userId,
        title: "New Chat",
        // personality, // TODO: Uncomment after server restart
        messages: "[]",
      },
      // select: {
      //   id: true,
      //   title: true,
      //   updatedAt: true,
      //   // personality: true,
      // },
    });

    return NextResponse.json({ session: newSession });
  } catch (error) {
    console.error("Create Session Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
