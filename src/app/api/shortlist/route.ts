import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { STAGES } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { universityId } = await req.json();

    if (!universityId) {
      return NextResponse.json(
        { error: "University ID required" },
        { status: 400 },
      );
    }

    // Upsert shortlist
    const shortlist = await prisma.shortlist.create({
      data: {
        userId: session.userId,
        universityId: universityId,
      },
    });

    // Check if we should auto-advance stage to SHORTLIST
    // Only if current stage is DISCOVERY
    const profile = await prisma.profile.findUnique({
      where: { userId: session.userId },
    });

    if (profile?.currentStage === STAGES.DISCOVERY) {
      // We could advance, OR we wait for explicit user action?
      // Requirement: "Unlock SHORTLIST section" (Stage 3).
      // Let's NOT auto-advance stage yet, but maybe we could?
      // User might want to discover more.
      // Let's leave stage advancement to a Dashboard button "I'm done discovering".
      // BUT, we need to ensure the button is enabled. (Dashboard checks count > 0).
    }

    return NextResponse.json({ success: true, shortlist });
  } catch (error) {
    // Unique constraint violation means already shortlisted, simpler to ignore or return success
    // Prisma P2002
    return NextResponse.json({ success: true, message: "Already shortlisted" });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const universityId = searchParams.get("universityId");

    if (!universityId) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await prisma.shortlist.deleteMany({
      where: {
        userId: session.userId,
        universityId: universityId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting" }, { status: 500 });
  }
}
