import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // admin user id
    },

    recipientType: {
      type: String,
      enum: ["ALL", "USER"],
      required: true,
    },

    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // only for USER type
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export const Announcement = mongoose.model(
  "Announcement",
  announcementSchema
);
