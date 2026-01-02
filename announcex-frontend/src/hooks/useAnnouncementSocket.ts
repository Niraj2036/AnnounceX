"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";

export const useAnnouncementSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const onAnnouncement = (announcement: any) => {
      console.log("📨 announcement received:", announcement);

      queryClient.setQueryData(["announcements"], (oldData: any) => {
        if (!oldData || !oldData.pages?.length) return oldData;

        const firstPage = oldData.pages[0];
        if (!Array.isArray(firstPage.data)) return oldData;

        // avoid duplicates
        if (firstPage.data.some((a: any) => a.id === announcement.id)) {
          return oldData;
        }

        return {
          ...oldData,
          pages: [
            {
              ...firstPage,
              data: [...firstPage.data, announcement],
            },
            ...oldData.pages.slice(1),
          ],
        };
      });
    };

    socket.on("announcement", onAnnouncement);

    return () => {
      socket.off("announcement", onAnnouncement);
    };
  }, [queryClient]);
};
