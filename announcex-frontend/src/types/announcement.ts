export type RecipientType = "ALL" | "USER";

export type Announcement = {
  _id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  recipientType: RecipientType;
  recipientId: string | null;
  createdAt: string;
};

export type CreateAnnouncementPayload = {
  content: string;
  recipientType: RecipientType;
  recipientId?: string | null;
};

export type GetAnnouncementsParams = {
  pageNo: number;
  pageSize: number;
};
