import { userRepository } from "../../core/db/repositories/user.repository.js";
import { AuthError } from "../auth/auth.errors.js";

export const userService = {
  getMe,
};

async function getMe(userId) {
  const user = await userRepository.findOne({
    _id: userId,
    isActive: true,
    deletedAt: null,
  });

  if (!user) {
    throw new AuthError("User not found or inactive", 404);
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    photoUrl: user.photoUrl,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
  };
}
