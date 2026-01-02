"use client";

import { useEffect, useRef } from "react";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { AnnouncementBubble } from "./AnnouncementBubble";
import { DateSeparator } from "./DateSeparator";
import { groupAnnouncementsByDate } from "@/utils/groupAnnouncementsByDate";

export function AnnouncementsFeed() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAnnouncements(15);

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const onScroll = () => {
    const el = containerRef.current;
    if (!el || !hasNextPage || isFetchingNextPage) return;

    // near top → load older messages
    if (el.scrollTop < 200) {
      fetchNextPage();
    }
  };

  const allAnnouncements =
  data?.pages
    .flatMap(page =>
      Array.isArray(page.data) ? page.data : []
    )
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime()
    ) ?? [];



  const grouped = groupAnnouncementsByDate(allAnnouncements);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allAnnouncements.length]);

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      className="flex-1 overflow-y-auto px-4 py-4 space-y-6"
    >
      {Object.entries(grouped).map(([date, messages]) => (
        <div key={date} className="space-y-4">
          <DateSeparator date={date} />

          {messages.map((msg: any) => (
            <AnnouncementBubble
              key={msg.id}
              announcement={msg}
            />
          ))}
        </div>
      ))}

      {isFetchingNextPage && (
        <div className="text-center text-sm text-zinc-400">
          Loading more...
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
