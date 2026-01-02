
import express from "express";
import activityRoutes from "./activity/activity.routes.js";
import announcementsRoutes from "./announcements/admin.ann.routes.js";
import userRoutes from "./users/admin.users.routes.js";
import { requireAdmin } from "../../core/middleware/admin.middleware.js";
import { requireAuth } from "../../core/middleware/auth.middleware.js";

const router = express.Router();
router.use(requireAuth,requireAdmin);
router.use("/activity", activityRoutes);
router.use("/announcements", announcementsRoutes);
router.use("/users", userRoutes);

export default router;
