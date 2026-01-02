import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import adminRoutes from "../modules/admin/index.js";
import userRoutes from "../modules/user/index.js";
import { errorHandler } from "../core/middleware/error.handler.js";
import { ensureDB } from "../core/middleware/ensureDB.js";

const router = express.Router();
router.use(errorHandler);
router.use(ensureDB);
router.use("/user",userRoutes)
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

export default router;
