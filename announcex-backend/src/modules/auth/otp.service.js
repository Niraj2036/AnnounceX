import { otpRepository } from "../../core/db/repositories/otp.repository.js";
import { generateOtp, hashOtp } from "../../core/utils/otp.util.js";
import { sendEmail } from "../../core/communication/email.service.js";
import { userRepository } from "../../core/db/repositories/user.repository.js";
import { AuthError } from "./auth.errors.js";
import {
  signLoginToken,
  signPasswordResetToken,
} from "../../core/security/jwt.js";


const OTP_EXPIRY_MINUTES = 10;

export const otpService = {
  async sendEmailVerificationOtp(user) {
    await otpRepository.deleteForUser(
      user._id,
      "EMAIL_VERIFICATION"
    );
    const otp = generateOtp();
    const codeHash = hashOtp(otp);

    await otpRepository.create({
      userId: user._id,
      codeHash,
      purpose: "EMAIL_VERIFICATION",
      expiresAt: new Date(
        Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
      ),
    });

    await sendEmail({
      to: user.email,
      subject: "Verify your email",
      text: `Your verification code is ${otp}. It expires in ${OTP_EXPIRY_MINUTES} minutes.`,
    });

    return { message: "OTP sent to email" };
  },

  async verifyOtp({ email, otp, purpose }) {
    if (!["EMAIL_VERIFICATION", "PASSWORD_RESET"].includes(purpose)) {
      throw new AuthError("Invalid OTP purpose", 400);
    }

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw AuthError.invalidOtp();
    }

    const otpRecord = await otpRepository.findByUserAndPurpose(
      user._id,
      purpose
    );

    if (!otpRecord) {
      throw AuthError.invalidOtp();
    }
    if (otpRecord.expiresAt < new Date()) {
      await otpRepository.deleteForUser(user._id, purpose);
      throw AuthError.otpExpired();
    }

    if (otpRecord.attempts >= otpRecord.maxAttempts) {
      await otpRepository.deleteForUser(user._id, purpose);
      throw AuthError.otpLimitExceeded();
    }

    const isValid = hashOtp(otp) === otpRecord.codeHash;

    if (!isValid) {
      await otpRepository.incrementAttempts(otpRecord._id);
      throw AuthError.invalidOtp();
    }

    await otpRepository.deleteForUser(user._id, purpose);

    if (purpose === "EMAIL_VERIFICATION") {
      await userRepository.updateById(user._id, {
        isVerified: true,
      });

      const token = signLoginToken({
        userId: user._id,
        role: user.role,
      });

      return {
        tokenType: "LOGIN",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    }

    if (purpose === "PASSWORD_RESET") {
      const resetToken = signPasswordResetToken({
        userId: user._id,
        purpose: "PASSWORD_RESET",
      });

      return {
        tokenType: "PASSWORD_RESET",
        token: resetToken,
      };
    }
  },
};
