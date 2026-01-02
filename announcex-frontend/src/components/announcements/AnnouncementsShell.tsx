"use client";

import { useAuth } from "@/context/auth-context";
import { AnnouncementsFeed } from "./AnnouncementsFeed";
import { AnnouncementComposer } from "./AnnouncementComposer";
import { useAnnouncementSocket } from "@/hooks/useAnnouncementSocket";
export function AnnouncementsShell() {
  const { user } = useAuth();
  useAnnouncementSocket();

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-zinc-50 rounded-lg border shadow-sm">
      
      <div className="px-4 py-3 border-b bg-white font-semibold">
        Announcements
      </div>

      <AnnouncementsFeed />
        <AnnouncementComposer />
      {user?.role !== "admin" && (
        <div className="px-4 py-2 text-sm text-center text-zinc-500 border-t bg-white">
          Only admins can create announcements
        </div>
      )}
    </div>
  );
}
