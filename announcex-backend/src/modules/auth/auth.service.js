import { userRepository } from "../../core/db/repositories/user.repository.js";
import { hashPassword, comparePassword } from "../../core/security/password.js";
import { signLoginToken } from "../../core/security/jwt.js";
import { AuthError } from "./auth.errors.js";
import { otpService } from "./otp.service.js";

export const authService = {
  async register({ name, email, password }) {
    let user = await userRepository.findByEmail(email);
    if (user && user.isVerified) {
      throw AuthError.emailAlreadyExists();
    }
    if (user && !user.isVerified) {
      const updatePayload = { name };

      if (password) {
        updatePayload.password = await hashPassword(password);
      }

      user = await userRepository.updateById(user._id, updatePayload);
    }

    if (!user) {
      user = await userRepository.create({
        name,
        email,
        password: password ? await hashPassword(password) : null,
        isVerified: false,
      });
    }
    try{
        await otpService.sendEmailVerificationOtp(user);

    }catch(err){
      console.error("Error during OTP sending:", err);
      throw AuthError.internalError();
    }

    return { message: "OTP sent to email" };
  },

  async login({ email, password }) {
    const user = await userRepository.findActiveByEmail(email);
    console.log("User found during login:", user);
    if (!user || !user.isVerified) {
      throw AuthError.invalidCredentials();
    }

    if (!user.password) {
      throw AuthError.passwordLoginNotAllowed();
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      throw AuthError.invalidCredentials();
    }

    await userRepository.updateById(user._id, {
      lastLoginAt: new Date(),
    });

    const token = signLoginToken({
      userId: user._id,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },
};
