import mongoose from "mongoose";

const doctorUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "User Name is required"],
    },
    phone: {
      type: String,
      unique: [true, "Phone number is already exist"],
      require: [true, "Phone number required"],
    },
    email: {
      type: String,
      unique: [true, "Email is already exist"],
      require: [true, "Email is required"],
    },
    password: {
      type: String,
      require: [true, "Email is required"],
      select: false,
    },
    profileInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctorProfile",
    },
    activeStatus: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const DoctorUser = mongoose.model("doctorUser", doctorUserSchema);
