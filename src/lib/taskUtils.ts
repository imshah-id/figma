import { prisma } from "./prisma";

export const generateGuidanceTasks = async (
  shortlistId: string,
  universityName: string,
) => {
  const formatDate = (daysFromNow: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const COMPREHENSIVE_TASKS = [
    {
      title: `Write Statement of Purpose for ${universityName}`,
      type: "Essay",
      status: "pending",
      dueDate: formatDate(14),
    },
    {
      title: "Prepare 2-3 Letters of Recommendation",
      type: "Documents",
      status: "pending",
      dueDate: formatDate(21),
    },
    {
      title: "Request Official Transcripts",
      type: "Documents",
      status: "pending",
      dueDate: formatDate(7),
    },
    {
      title: "Upload English Test Scores (IELTS/TOEFL)",
      type: "Documents",
      status: "pending",
      dueDate: formatDate(14),
    },
    {
      title: `Complete ${universityName} Application Form`,
      type: "Admin",
      status: "pending",
      dueDate: formatDate(28),
    },
  ];

  // Check if tasks exist
  const count = await prisma.guidanceTask.count({
    where: { shortlistId },
  });

  if (count === 0) {
    await prisma.guidanceTask.createMany({
      data: COMPREHENSIVE_TASKS.map((task) => ({
        shortlistId,
        ...task,
      })),
    });
  }
};
