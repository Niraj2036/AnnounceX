import { adminUsersService } from "./admin.users.service.js";
import { AuthError } from "../../auth/auth.errors.js";

export async function createUser(req, res, next) {
  try {
    const { name, email, password, role } = req.body;

    const result = await adminUsersService.createUser({
      name,
      email,
      password,
      role,
      performedBy: req.user.userId, 
    });

    return res.status(201).json({
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    return handleError(err, res, next);
  }
}

export async function getUsers(req, res, next) {
  try {
    const {
      pageNo = 1,
      pageSize = 10,
      search = "",
      role = "ALL",
      sort = "NEWEST",
    } = req.query;

    const result = await adminUsersService.getUsers({
      pageNo,
      pageSize,
      search,
      role,
      sort,
    });

    return res.status(200).json({
      message: "Users fetched successfully",
      ...result,
    });
  } catch (err) {
    return handleError(err, res, next);
  }
}

export async function updateUser(req, res, next) {
  try {
    const { id: userId } = req.params;

    const result = await adminUsersService.updateUser({
      userId,
      updates: req.body,
      performedBy: req.user.userId,
    });

    return res.status(200).json({
      message: "User updated successfully",
      data: result,
    });
  } catch (err) {
    return handleError(err, res, next);
  }
}


export async function deleteUser(req, res, next) {
  try {
    const { id: userId } = req.params;

    const result = await adminUsersService.deleteUser({
      userId,
      performedBy: req.user.userId,
    });

    return res.status(200).json({
      message: result.message,
    });
  } catch (err) {
    return handleError(err, res, next);
  }
}
function handleError(err, res) {
  if (err instanceof AuthError) {
    return res.status(err.statusCode || 400).json({
      message: err.message,
    });
  }
  console.error("Unhandled users error:", err);

  return res.status(500).json({
    message:
      "Something went wrong while getting users. Please try again.",
  });
}
