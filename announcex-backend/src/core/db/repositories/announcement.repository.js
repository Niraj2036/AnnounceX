import { Announcement } from "../models/announcement.model.js";

import { normalizeSender } from "../../utils/normalizeSender.js";
export const announcementRepository = {
  create,
  findForUser,
};

async function create(data) {
  return Announcement.create(data);
}


async function findForUser({ userId, pageNo, pageSize }) {
  const skip = (pageNo - 1) * pageSize;

  const filter = {
    $or: [
      { recipientType: "ALL" },

      { recipientType: "USER", recipientId: userId },

      { sender: userId },
    ],
  };

  const [announcements, totalCount] = await Promise.all([
    Announcement.find(filter)
      .populate("sender", "name email role deletedAt")
      .sort({ createdAt: -1 }) // usually newest first is better UX
      .skip(skip)
      .limit(pageSize),
    Announcement.countDocuments(filter),
  ]);

  const data = announcements.map(a => ({
    id: a._id,
    content: a.content,
    sender: normalizeSender(a.sender),
    recipientType: a.recipientType,
    recipientId: a.recipientId,
    createdAt: a.createdAt,
  }));

  return {
    data,
    pagination: {
      pageNo,
      pageSize,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      hasNextPage: pageNo * pageSize < totalCount,
      hasPrevPage: pageNo > 1,
    },
  };
}

