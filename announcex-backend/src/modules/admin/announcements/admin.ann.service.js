import { announcementRepository } from "../../../core/db/repositories/announcement.repository.js";
import { getIO } from "../../../core/sockets/index.js";
import { AuthError } from "../../auth/auth.errors.js";

export const adminAnnouncementService = {
  createAnnouncement,
};

async function createAnnouncement({
  content,
  recipientType,
  recipientId = null,
  performedBy,
}) {
  if (!content || !recipientType) {
    throw new AuthError("Content and recipient type are required", 400);
  }

  if (!["ALL", "USER"].includes(recipientType)) {
    throw new AuthError("Invalid recipient type", 400);
  }

  if (recipientType === "USER" && !recipientId) {
    throw new AuthError(
      "recipientId is required for USER announcements",
      400
    );
  }

  const announcement =
    await announcementRepository.create({
      content,
      sender: performedBy,
      recipientType,
      recipientId:
        recipientType === "USER" ? recipientId : null,
    });
    await announcement.populate("sender", "name email role");
  const io = getIO();

  const payload = {
  id: announcement._id,
  content: announcement.content,
  sender: {
    id: announcement.sender._id,
    name: announcement.sender.name,
    email: announcement.sender.email,
    role: announcement.sender.role,
  },
  recipientType: announcement.recipientType,
  recipientId: announcement.recipientId,
  createdAt: announcement.createdAt,
};


  if (recipientType === "ALL") {
    io.to("all").emit("announcement", payload);
  } else {
    io.to(`user:${recipientId}`).emit("announcement", payload);
  }

  return payload;
}
