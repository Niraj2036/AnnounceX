import { AuthError } from "../../modules/auth/auth.errors.js";

export function requireAdmin(req, res, next) {
  try {
    // requireAuth must run before this
    if (!req.user) {
      throw new AuthError("Unauthorized", 401);
    }

    if (req.user.role !== "admin") {
      throw new AuthError(
        "Admin access required",
        403
      );
    }

    next();
  } catch (err) {
    next(err);
  }
}
