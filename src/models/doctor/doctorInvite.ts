import mongoose from "mongoose";

const doctorInviteSchema = new mongoose.Schema({
  invitedBy: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "expired"],
    default: "pending",
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  },
});
