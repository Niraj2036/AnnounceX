import { Activity } from "../models/activity.model.js";

export const activityRepository = {
  create,
  findAll,
};

async function create(data) {
  return Activity.create(data);
}

async function findAll({ page, limit, search, action }) {
  const filter = {};

  if (action !== "ALL") {
    filter.action = action;
  }

  if (search) {
    filter.$or = [
      { action: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;

  const [logs, totalCount] = await Promise.all([
    Activity.find(filter)
      .populate("performedBy", "name email role")
      .populate("targetUser", "name email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Activity.countDocuments(filter),
  ]);

  return {
    data: logs,
    pagination: {
      pageNo: page,
      pageSize: limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      hasNextPage: page * limit < totalCount,
      hasPrevPage: page > 1,
    },
  };
}
