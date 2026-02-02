import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { STAGES } from "@/lib/constants";
import { generateGuidanceTasks } from "@/lib/taskUtils";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { universityId, isLocked } = await req.json();

    if (!universityId) {
      return NextResponse.json(
        { error: "University ID required" },
        { status: 400 },
      );
    }

    // Toggle lock
    const updated = await prisma.shortlist.updateMany({
      where: {
        userId: session.userId,
        universityId: universityId,
      },
      data: {
        isLocked: isLocked,
      },
    });

    // Auto-advance Stage logic:
    // If locking (isLocked=true) AND currentStage is SHORTLIST
    if (isLocked) {
      // Fetch university name for task generation
      const shortlistItem = await prisma.shortlist.findFirst({
        where: { userId: session.userId, universityId: universityId },
        include: { university: true },
      });

      if (shortlistItem) {
        await generateGuidanceTasks(
          shortlistItem.id,
          shortlistItem.university.name,
        );
      }

      const profile = await prisma.profile.findUnique({
        where: { userId: session.userId },
      });

      if (profile?.currentStage === STAGES.SHORTLIST) {
        await prisma.profile.update({
          where: { userId: session.userId },
          data: { currentStage: STAGES.GUIDANCE },
        });
        return NextResponse.json({ success: true, advanced: true });
      }
    }

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error("Lock error", error);
    return NextResponse.json({ error: "Lock failed" }, { status: 500 });
  }
}
