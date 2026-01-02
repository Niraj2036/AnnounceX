"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useCreateAnnouncement } from "@/hooks/useAnnouncements";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MentionPicker } from "./MentionPicker";
import { TargetedUsersChips } from "./TargetedUsersChips";

export function AnnouncementComposer() {
  const { user } = useAuth();
  const createMutation = useCreateAnnouncement();

  const [content, setContent] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [targets, setTargets] = useState<any[]>([]);

  if (user?.role !== "admin") return null;

  const sendAnnouncement = async () => {
    if (!content.trim()) {
      toast.error("Announcement cannot be empty");
      return;
    }

    if (targets.length === 0) {
      createMutation.mutate({
        content,
        recipientType: "ALL",
        recipientId: null,
      });
    } else {
      targets.forEach((t) =>
        createMutation.mutate({
          content,
          recipientType: "USER",
          recipientId: t.id,
        })
      );
    }

    setContent("");
    setTargets([]);
    setShowMentions(false);
  };

  return (
    <div className="border-t bg-white p-3 space-y-2">
      <TargetedUsersChips users={targets} onRemove={setTargets} />

      <div className="relative">
        <Textarea
          rows={3}
          value={content}
          placeholder="Write '@' for targeted announcement..."
          onChange={(e:any) => {
            setContent(e.target.value);
            setShowMentions(e.target.value.endsWith("@"));
          }}
        />

        {showMentions && (
          <MentionPicker
            onSelect={(user) => {
              setTargets((prev) => [...prev, user]);
              setShowMentions(false);
            }}
          />
        )}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={sendAnnouncement}
          disabled={createMutation.isPending}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
