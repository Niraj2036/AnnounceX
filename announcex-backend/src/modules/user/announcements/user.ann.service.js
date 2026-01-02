import { announcementRepository } from "../../../core/db/repositories/announcement.repository.js";
import { AuthError } from "../../auth/auth.errors.js";

export const userAnnouncementService = {
  getAnnouncements,
};

async function getAnnouncements({
  userId,
  pageNo = 1,
  pageSize = 10,
}) {
  const page = Number(pageNo);
  const limit = Number(pageSize);

  if (page < 1 || limit < 1) {
    throw new AuthError("Invalid pagination values", 400);
  }

  return announcementRepository.findForUser({
    userId,
    pageNo: page,
    pageSize: limit,
  });
}
