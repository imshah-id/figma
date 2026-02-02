import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { STAGES, STAGE_ORDER } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { targetStage } = await req.json();

    const profile = await prisma.profile.findUnique({
      where: { userId: session.userId },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Logic to validate transition
    // For now, simpler logic: if target is next in line, allow it.
    // In production, we would check "is profile complete?" here.

    const currentIdx = STAGE_ORDER.indexOf(profile.currentStage as any);
    const targetIdx = STAGE_ORDER.indexOf(targetStage as any);

    if (targetIdx <= currentIdx) {
      // Already there or past
      return NextResponse.json({ success: true, stage: profile.currentStage });
    }

    // Allow moving to next stage only
    if (targetIdx === currentIdx + 1) {
      // Specifically for PROFILE -> DISCOVERY
      if (
        profile.currentStage === STAGES.PROFILE &&
        targetStage === STAGES.DISCOVERY
      ) {
        // Mock validation: Check if mandatory fields exist (gpa, budget, etc are required by schema so they exist)
        // We assume if they exist, it's valid.
      }

      const updated = await prisma.profile.update({
        where: { userId: session.userId },
        data: { currentStage: targetStage },
      });

      return NextResponse.json({ success: true, stage: updated.currentStage });
    }

    return NextResponse.json(
      { error: "Invalid stage transition" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Stage advance error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
