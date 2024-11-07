import mongoose from "mongoose";

const doctorInviteSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);


export const DoctorInvite = mongoose.model("doctorInvite", doctorInviteSchema)
