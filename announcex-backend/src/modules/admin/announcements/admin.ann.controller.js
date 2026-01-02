import { adminAnnouncementService } from "./admin.ann.service.js";
import { AuthError } from "../../auth/auth.errors.js";

export async function createAnnouncement(req, res) {
  try {
    const { content, recipientType, recipientId } = req.body;

    if (!content || typeof content !== "string") {
      throw new AuthError(
        "Announcement content is required",
        400
      );
    }

    if (!recipientType) {
      throw new AuthError(
        "recipientType is required",
        400
      );
    }

    const result =
      await adminAnnouncementService.createAnnouncement({
        content: content.trim(),
        recipientType,
        recipientId,
        performedBy: req.user.userId, 
      });

    return res.status(201).json({
      message: "Announcement created successfully",
      data: result,
    });
  } catch (err) {
    return handleError(err, res);
  }
}

function handleError(err, res) {
  if (err instanceof AuthError) {
    return res.status(err.statusCode || 400).json({
      message: err.message,
    });
  }
  console.error("Unhandled announcement error:", err);

  return res.status(500).json({
    message:
      "Something went wrong while creating the announcement. Please try again.",
  });
}
