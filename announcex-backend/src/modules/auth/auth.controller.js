import { authService } from "./auth.service.js";
import { otpService } from "./otp.service.js";


export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const result = await authService.register({
      name,
      email,
      password,
    });

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}



export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const result = await authService.login({
      email,
      password,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function verifyOtp(req, res, next) {
  try {
    const { email, otp, purpose } = req.body;

    if (!email || !otp || !purpose) {
      return res.status(400).json({
        message: "Email, OTP, and purpose are required",
      });
    }

    const validPurposes = ["EMAIL_VERIFICATION", "PASSWORD_RESET"];

    if (!validPurposes.includes(purpose)) {
      return res.status(400).json({
        message: "Invalid OTP purpose",
      });
    }

    if (!/^\d{4,6}$/.test(String(otp))) {
      return res.status(400).json({
        message: "Invalid OTP format",
      });
    }

    const result = await otpService.verifyOtp({
      email,
      otp,
      purpose,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}
