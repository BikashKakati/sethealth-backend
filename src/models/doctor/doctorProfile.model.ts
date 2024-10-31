import mongoose from "mongoose";

const doctorProfileSchema = new mongoose.Schema(
  {
    doctorId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"doctorUser",
    },
    degree: {
      type: String,
      require: [true, "Degree is required"],
    },
    services: {
      type: [
        {
          serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "services" },
          serviceTypes: {
            type: [String],
          },
          // service name and symptoms can be changed over time...
        },
      ],
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
    availableTimingSlots: {
      timings: {
        type: [
          {
            from: String,
            to: String,
            servicesType: [String],
          },
        ],
      },
      weekdays: {
        type: [String],
      },
    },
    price: {
      type: [
        {
          serviceType: String,
          rate: Number,
        },
      ],
    },
  },
  { timestamps: true }
);

export const DoctorProfile = mongoose.model(
  "doctorProfile",
  doctorProfileSchema
);
