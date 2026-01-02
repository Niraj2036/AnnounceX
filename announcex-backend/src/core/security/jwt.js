import jwt from "jsonwebtoken";

const LOGIN_EXPIRES_IN = "1d";
const RESET_EXPIRES_IN = "10m";

export function signLoginToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: LOGIN_EXPIRES_IN,
  });
}

export function signPasswordResetToken(payload) {
  return jwt.sign(payload, process.env.JWT_RESET_SECRET, {
    expiresIn: RESET_EXPIRES_IN,
  });
}

export function verifyLoginToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export function verifyResetToken(token) {
  return jwt.verify(token, process.env.JWT_RESET_SECRET);
}
