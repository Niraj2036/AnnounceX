import { userAnnouncementService } from "./user.ann.service.js";
import { AuthError } from "../../auth/auth.errors.js";


export async function getAnnouncements(req, res) {
  try {
    const {
      pageNo = 1,
      pageSize = 10,
    } = req.query;

    const result =
      await userAnnouncementService.getAnnouncements({
        userId: req.user.userId,
        pageNo,
        pageSize,
      });

    return res.status(200).json({
      message: "Announcements fetched successfully",
      ...result,
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

  console.error("Unhandled user announcement error:", err);

  return res.status(500).json({
    message:
      "Something went wrong while fetching announcements. Please try again.",
  });
}
