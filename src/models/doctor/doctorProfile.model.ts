import mongoose from "mongoose";

const doctorProfileSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      require: [true, "Degree is required"],
    },
    services: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "services" }],
    },

    experience: {
      type: Number,
    },
    currentOrganization: {
      type: String,
    },
    description: {
      type: String,
    },
    availableTimingRange: {
      type: [
        {
          from: Date,
          to: Date,
          servicesType: [String],
        },
      ],
    },
    price: {
      type: [
        {
          serviceType: String,
          rate: Number,
        },
      ],
    },
    rating: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
    },
  },
  { timestamps: true }
);

export const DoctorUser = mongoose.model("doctorProfile", doctorProfileSchema);
