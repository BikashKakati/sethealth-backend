import mongoose from "mongoose";

const appointments = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "registeredUsers",
  },
  slot: {
    type: {
      date: String,
      time: String,
    },
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "registeredUsers",
  },
  service: {
    type: [String],
  },
  symptoms: {
    type: [String],
  },
  existingPrescriptions: {
    type: [String],
  },
  serviceType: {
    type: String,
  },
  appointmentStatus: {
    type: {
      status: {
        type: String,
        enum: ["upcoming", "rescheduled", "canceled", "completed"],
        required: true,
      },
      details: {
        rescheduled: {
          reason: String,
          rescheduledUser: {
            id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "registeredUsers",
            },
            name: String,
            email: String,
          },
          slot: {
            type: {
              date: String,
              time: String,
            },
          },
          reschedulingCost: Number,
        },
        canceled: {
          reason: String,
          canceledUser: {
            id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "registeredUsers",
            },
            name: String,
            email: String,
          },
          cancellationFee: Number,
          refundedAmount: Number,
        },
      },
    },
  },
  paymentStatus: {
    type: Boolean,
    default: true,
  },
  appointmentCost: {
    type: Number,
  },
  newPrescriptions: {
    type: String,
  },
  review: {
    type: String,
  },
  paymentId: {
    type: Number,
  },
});

export const Appointments = mongoose.model("appointments", appointments);
