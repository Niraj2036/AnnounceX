import { api } from "./axios";
import {
  CreateAnnouncementPayload,
  GetAnnouncementsParams,
} from "@/types/announcement";

export const announcementsApi = {
  create: async (payload: CreateAnnouncementPayload) => {
    const { data } = await api.post(
      "/admin/announcements",
      payload
    );
    return data;
  },

  getUserAnnouncements: async (
    params: GetAnnouncementsParams
  ) => {
    const { data } = await api.get(
      "/user/announcements",
      { params }
    );
    return data;
  },
};
