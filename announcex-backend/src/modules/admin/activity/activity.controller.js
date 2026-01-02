import { activityService } from "./activity.service.js";
import { AuthError } from "../../auth/auth.errors.js";

export async function getActivityLogs(req, res) {
  try {
    const {
      pageNo = 1,
      pageSize = 10,
      search = "",
      action = "ALL",
    } = req.query;

    const result = await activityService.getActivityLogs({
      pageNo,
      pageSize,
      search,
      action,
    });

    return res.status(200).json({
      message: "Activity logs fetched successfully",
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

  console.error("Unhandled activity error:", err);

  return res.status(500).json({
    message:
      "Something went wrong while fetching activity logs. Please try again.",
  });
}
