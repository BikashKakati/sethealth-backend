import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctorUser",
      require: [true, "doctor id is required"],
    },
    review: {
      type: String,
    },
    rating: {
      type: Number,
    },
    patientName: {
      type: String,
    },
    // Fix: patient modall.
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctorUser",
    },
    serviceType: {
      name: String,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model("review", reviewSchema);
