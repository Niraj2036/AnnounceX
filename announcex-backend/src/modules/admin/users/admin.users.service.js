import bcrypt from "bcryptjs";
import { userRepository } from "./../../../core/db/repositories/user.repository.js";
import { activityRepository } from "../../../core/db/repositories/activity.repository.js";
import { AuthError } from "../../auth/auth.errors.js";
import { hashPassword } from "../../../core/security/password.js";

const VALID_ROLES = ["admin", "user"];
const SORT_MAP = {
  NEWEST: { createdAt: -1 },
  OLDEST: { createdAt: 1 },
  A_Z: { name: 1 },
  Z_A: { name: -1 },
};

export const adminUsersService = {
  createUser,
  getUsers,
  updateUser,
  deleteUser
};

async function createUser({ name, email, password, role, performedBy }) {
  if (!name || !email || !password || !role) {
    throw new AuthError("All fields are required", 400);
  }

  if (!VALID_ROLES.includes(role)) {
    throw new AuthError("Invalid role", 400);
  }

  if (password.length < 6) {
    throw new AuthError("Password must be at least 6 characters", 400);
  }

  const existingUser = await userRepository.findOne({
    email,
    deletedAt: null,
  });

  if (existingUser) {
    throw new AuthError("User already exists", 409);
  }

  const passwordHash = await hashPassword(password);

  const user = await userRepository.create({
    name,
    email,
    password:passwordHash,
    role,
    isVerified: true,    
    deletedAt: null,
  });

  await activityRepository.create({
    action: role === "ADMIN" ? "CREATE_ADMIN" : "CREATE_USER",
    performedBy,
    targetUser: user._id,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

async function getUsers({
  pageNo = 1,
  pageSize = 10,
  search = "",
  role = "ALL",
  sort = "NEWEST",
}) {
  pageNo = Number(pageNo);
  pageSize = Number(pageSize);

  if (pageNo < 1 || pageSize < 1) {
    throw new AuthError("Invalid pagination values", 400);
  }

  const filter = {
    deletedAt: null,
  };

  if (role !== "ALL") {
    if (!VALID_ROLES.includes(role)) {
      throw new AuthError("Invalid role filter", 400);
    }
    filter.role = role;
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const sortQuery = SORT_MAP[sort] || SORT_MAP.NEWEST;

  const skip = (pageNo - 1) * pageSize;

  const [users, totalCount] = await Promise.all([
    userRepository.find(filter, {
      passwordHash: 0,
    }, {
      skip,
      limit: pageSize,
      sort: sortQuery,
    }),
    userRepository.count(filter),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    data: users,
    pagination: {
      pageNo,
      pageSize,
      totalCount,
      totalPages,
      hasNextPage: pageNo < totalPages,
      hasPrevPage: pageNo > 1,
    },
  };
}

async function updateUser({ userId, updates, performedBy }) {
  if (!userId) {
    throw new AuthError("User ID is required", 400);
  }

  if (userId === performedBy) {
    throw new AuthError(
      "Admin cannot update their own account",
      400
    );
  }

  const user = await userRepository.findOne({
    _id: userId,
    deletedAt: null,
  });

  if (!user) {
    throw new AuthError("User not found", 404);
  }
  delete updates.email;
  delete updates.deletedAt;

  if (updates.role && !VALID_ROLES.includes(updates.role)) {
    throw new AuthError("Invalid role", 400);
  }


  if (updates.password) {
    if (updates.password.length < 6) {
      throw new AuthError(
        "Password must be at least 6 characters",
        400
      );
    }

    updates.passwordHash = await bcrypt.hash(
      updates.password,
      10
    );
    delete updates.password;
  }

  const updatedUser = await userRepository.updateById(
    userId,
    updates
  );

  await activityRepository.create({
    action:
      user.role === "ADMIN" ? "UPDATE_ADMIN" : "UPDATE_USER",
    performedBy,
    targetUser: userId,
  });

  return {
    id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
    updatedAt: updatedUser.updatedAt,
  };
}


async function deleteUser({ userId, performedBy }) {
  if (!userId) {
    throw new AuthError("User ID is required", 400);
  }

  if (userId === performedBy) {
    throw new AuthError("Admin cannot delete themselves", 400);
  }

  const user = await userRepository.findOne({
    _id: userId,
    deletedAt: null,
  });

  if (!user) {
    throw new AuthError("User not found", 404);
  }

  await userRepository.updateById(userId, {
    deletedAt: new Date(),
  });

  await activityRepository.create({
    action:
      user.role === "ADMIN" ? "DELETE_ADMIN" : "DELETE_USER",
    performedBy,
    targetUser: userId,
  });

  return {
    message: "User deleted successfully",
  };
}


