import mongoose, { mongo } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "registeredUsers",
      require: [true, "doctor id is required"],
    },
    reviewMessage: {
      type: String,
    },
    rating: {
      type: Number,
    },
    // Fix: patient modall.
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "registeredUsers",
    },
    appointmentId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"appointment",
    }
  },
  { timestamps: true }
);

export const Review = mongoose.model("review", reviewSchema);
