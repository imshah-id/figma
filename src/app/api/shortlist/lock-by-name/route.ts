import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { generateGuidanceTasks } from "@/lib/taskUtils";

// Special endpoint for AI Actions to lock by name
export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name } = await req.json();
    if (!name)
      return NextResponse.json({ error: "Name required" }, { status: 400 });

    // 1. Find University
    const university = await prisma.university.findFirst({
      where: {
        name: { contains: name, mode: "insensitive" },
      },
    });

    if (!university) {
      return NextResponse.json(
        { error: "University not found" },
        { status: 404 },
      );
    }

    // 2. Upsert Shortlist (Add if not exists)
    // We first check if it exists to get ID
    let shortlistItem = await prisma.shortlist.findUnique({
      where: {
        userId_universityId: {
          userId: session.userId,
          universityId: university.id,
        },
      },
    });

    if (!shortlistItem) {
      shortlistItem = await prisma.shortlist.create({
        data: {
          userId: session.userId,
          universityId: university.id,
        },
      });
    }

    // 3. Lock It
    if (!shortlistItem.isLocked) {
      await prisma.shortlist.update({
        where: { id: shortlistItem.id },
        data: { isLocked: true },
      });

      // 4. Trigger Tasks
      await generateGuidanceTasks(shortlistItem.id, university.name);

      // Update Profile Stage

      // Update Profile Stage
      await prisma.profile.update({
        where: { userId: session.userId },
        data: { currentStage: "GUIDANCE" },
      });

      return NextResponse.json({ success: true, university: university.name });
    }

    return NextResponse.json({
      success: true,
      university: university.name,
      message: "Already locked",
    });
  } catch (error) {
    console.error("Lock by name error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
