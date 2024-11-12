import { z } from "zod";

export const CreateAppointmentSchemaZod = z.object({
  doctorId: z
    .string({ invalid_type_error: "Doctor ID must be a string." })
    .trim()
    .min(1, "Doctor ID is required."),
  patientId: z
    .string({ invalid_type_error: "Patient ID must be a string." })
    .trim()
    .min(1, "Patient ID is required."),
  slot: z.object({
    date: z
      .string({ invalid_type_error: "Slot date must be a string." })
      .trim()
      .min(1, "Slot date is required."),
    time: z
      .string({ invalid_type_error: "Slot time must be a string." })
      .trim()
      .min(1, "Slot time is required."),
  }),
  service: z
    .array(z.string({ invalid_type_error: "Each service must be a string." }))
    .min(1, "At least one service is required."),
  symptoms: z
    .array(z.string({ invalid_type_error: "Each symptom must be a string." }))
    .optional(),
  serviceType: z
    .string({ invalid_type_error: "Service type must be a string." })
    .trim()
    .min(1, "Service type is required."),
  appointmentStatus: z.object({
    status: z.literal("upcoming"),
  }),
  appointmentCost: z
    .number({ invalid_type_error: "Appointment cost must be a number." })
    .positive("Appointment cost must be a positive number."),
});
