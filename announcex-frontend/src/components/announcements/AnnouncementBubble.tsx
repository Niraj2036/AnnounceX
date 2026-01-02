"use client";

import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { RichTextRenderer } from "./RichTextRenderer";
import { UserAvatar } from "@/components/admin/admin-users/UserAvatar";
import { Trash2 } from "lucide-react";

export function AnnouncementBubble({ announcement }: { announcement: any }) {
  const { user } = useAuth();

  const isMine = announcement.sender?.id === user?.id;
  const isDeleted = !announcement.sender;

  return (
    <div
      className={cn(
        "flex w-full",
        isMine ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-lg px-3 py-2 shadow-sm",
          isMine
            ? "bg-zinc-900 text-white rounded-br-none"
            : "bg-white text-zinc-900 rounded-bl-none border"
        )}
      >
        {/* Sender */}
        {!isMine && (
          <div className="flex items-center gap-2 mb-1">
            {isDeleted ? (
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-zinc-200">
                <Trash2 className="h-4 w-4 text-zinc-500" />
              </div>
            ) : (
              <UserAvatar
                name={announcement.sender.name}
                photoUrl={announcement.sender.photoUrl}
              />
            )}

            <span className="text-xs font-medium text-zinc-600">
              {isDeleted ? "Deleted User" : announcement.sender.name}
            </span>
          </div>
        )}

        {/* Content */}
        <RichTextRenderer content={announcement.content} />

        {/* Time */}
        <div
          className={cn(
            "mt-1 text-[10px] text-right",
            isMine ? "text-zinc-300" : "text-zinc-400"
          )}
        >
          {new Date(announcement.createdAt).toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          )}
        </div>
      </div>
    </div>
  );
}
