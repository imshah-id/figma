"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import UniversityCard from "@/components/UniversityCard";

export default function ShortlistGrid({
  shortlist = [],
}: {
  shortlist: any[];
}) {
  const router = useRouter();

  const hasLocked = shortlist.some((item: any) => item.isLocked);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
        {shortlist.map((item: any, index: number) => (
          <div key={item.id} className="h-full">
            <UniversityCard
              uni={{
                ...item.university,
                matchScore: 85, // Mock
              }}
              index={index}
              initialIsShortlisted={true}
              showLockAction={true}
              initialIsLocked={item.isLocked}
              onLockToggle={async () => {
                router.refresh();
              }}
              onGuidanceClick={() => router.push("/tasks")}
            />
          </div>
        ))}
      </div>
    </>
  );
}
