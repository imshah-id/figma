"use client";

import React, { useState } from "react";
import { Edit2 } from "lucide-react";
import EditProfileModal from "./EditProfileModal";

interface ProfileActionsProps {
  user: any; // The full user object with profile attached
}

export default function ProfileActions({ user }: ProfileActionsProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsEditModalOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:bg-neutral-800 hover:shadow-lg active:scale-95"
      >
        <Edit2 size={16} />
        Edit Profile
      </button>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />
    </>
  );
}
