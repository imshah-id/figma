import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CounsellorLayout from "@/components/Counsellor/CounsellorLayout";

export default async function CounsellorPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.userId },
    include: { user: true },
  });

  const userName = profile?.user?.fullName || session.email.split("@")[0];

  return <CounsellorLayout userName={userName} />;
}
