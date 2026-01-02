import { verifyLoginToken } from "../security/jwt.js";
import { AuthError } from "../../modules/auth/auth.errors.js";
import { userRepository } from "../db/repositories/user.repository.js";
export async function requireAuth(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token) throw new AuthError("Unauthorized", 401);

    const payload = verifyLoginToken(token);

    const user = await userRepository.findById(payload.userId);

    if (!user || !user.isActive) {
      throw new AuthError("User inactive or deleted", 401);
    }
 
    req.user = user;
    req.user.userId = user._id; 
    next();
  } catch (err) {
    next(err);
  }
}
export function extractToken(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return null;
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) return null;

  return token;
}

