import { z } from "zod";

const serviceTypeSchema = z
  .string({
    required_error: "Service type is required",
    invalid_type_error: "Service type must be a string",
  })
  .trim()
  .min(1, "Service type cannot be empty.");

export const doctorProfileSchemaZod = z.object({
  doctorId:z.string({invalid_type_error: "DoctorId must be a string"}).trim().min(1,"Doctor id is required"),
  degree: z
    .string({invalid_type_error: "Degree must be a string",})
    .trim()
    .min(1, "Degree cannot be empty."),

  services: z
    .array(
      z.object({
        serviceId: z
          .string({ required_error: "Service ID is required." })
          .min(1, "Service ID cannot be empty."),
        serviceTypes: z
          .array(serviceTypeSchema)
          .nonempty({ message: "At least one service type is required." }),
      })
    )
    .nonempty({ message: "At least one service is required." }),

  experience: z
    .number({ invalid_type_error: "Experience must be a number." })
    .min(0, "Experience cannot be negative."),

  currentOrganization: z
    .string({invalid_type_error: "Current organization must be a string",})
    .trim()
    .max(50, "Current organization name cannot exceed 100 characters.")
    .optional()
    .nullable(),

  description: z
    .string({invalid_type_error: "Description must be a string",})
    .trim()
    .min(1, "Description cannot be empty")
    .max(300, "Description cannot exceed 300 characters."),

  availableTimingSlots: z.object({
    timings: z.array(
      z.object({
        from: z
          .string({ required_error: "Start time (from) is required." })
          .time("Start time must be a valid time.FORMAT-(08:04:41)"),
        to: z
          .string({ required_error: "End time (to) is required." })
          .time("End time must be a valid time.FORMAT-(08:04:41)"),
        servicesType: z
          .array(serviceTypeSchema)
          .nonempty({ message: "At least one service type is required." }),
      })
    ),
    weekdays: z.array(z.string().trim().min(1, "days cannot be empty")),
  }),

  price: z.array(
    z.object({
      serviceType: serviceTypeSchema,
      rate: z
        .number({ required_error: "Price is required.",invalid_type_error:"Price must be a number" })
        .min(0, "Rate cannot be negative."),
    })
  ),
});

export const doctorProfileUpdateSchemaZod = doctorProfileSchemaZod.partial();

export type DoctorProfileSchemaType = z.infer<typeof doctorProfileSchemaZod>;
