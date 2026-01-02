import { userService } from "./user.service.js";
import { AuthError } from "../auth/auth.errors.js";


export async function getMe(req, res) {
  try {
    const result = await userService.getMe(req.user.userId);

    return res.status(200).json({
      message: "User fetched successfully",
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

  console.error("Unhandled getMe error:", err);

  return res.status(500).json({
    message: "Failed to fetch user profile",
  });
}
