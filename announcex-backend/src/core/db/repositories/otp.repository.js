import { OtpModel } from "../models/otp.model.js";

export const otpRepository = {
  create(data) {
    return OtpModel.create(data);
  },

  findByUserAndPurpose(userId, purpose) {
    return OtpModel.findOne({ userId, purpose });
  },

  deleteForUser(userId, purpose) {
    return OtpModel.deleteMany({ userId, purpose });
  },

  incrementAttempts(id) {
    return OtpModel.findByIdAndUpdate(id, {
      $inc: { attempts: 1 },
    });
  },
};
