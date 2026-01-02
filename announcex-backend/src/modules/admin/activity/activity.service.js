import { activityRepository } from "../../../core/db/repositories/activity.repository.js";
import { AuthError } from "../../auth/auth.errors.js";

export const activityService = {
  getActivityLogs,
};

async function getActivityLogs({
  pageNo = 1,
  pageSize = 10,
  search = "",
  action = "ALL",
}) {
  const page = Number(pageNo);
  const limit = Number(pageSize);

  if (page < 1 || limit < 1) {
    throw new AuthError("Invalid pagination values", 400);
  }

  return activityRepository.findAll({
    page,
    limit,
    search,
    action,
  });
}
