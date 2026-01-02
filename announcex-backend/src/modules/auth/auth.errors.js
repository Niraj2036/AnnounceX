import { AppError } from "../../core/errors/app.error.js";

export class AuthError extends AppError {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }

  static invalidCredentials() {
    return new AuthError("Invalid email or password", 401);
  }

  static emailAlreadyExists() {
    return new AuthError("Email already registered", 409);
  }

  static invalidOtp() {
    return new AuthError("Invalid OTP", 401);
  }

  static otpExpired() {
    return new AuthError("OTP expired", 410);
  }

  static otpLimitExceeded() {
    return new AuthError("OTP attempt limit exceeded", 429);
  }

  static passwordLoginNotAllowed() {
    return new AuthError(
      "Password login not allowed for this account",
      403
    );
  }
  static internalError() {
    return new AuthError("Internal server error", 500);
  }
}
