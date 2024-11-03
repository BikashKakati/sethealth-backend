import { z } from "zod";


export const servicesSchemaZod = z.object({
    serviceName: z.string({required_error:"Service name is requried",invalid_type_error:"Service name is not a valid string"}).trim().min(1,{message:"Service Name cannot be empty"}),
    symptoms: z.array(
        z.string({invalid_type_error:"Symptoms are not valid string"}).trim().min(1,{message:"Symptoms cannot be empty value"})
    ).nonempty({message:"Atleast one symptom required"})
})

export const servicesEditSchemaZod = servicesSchemaZod.partial();

export type ServiceSchemaZodType = z.infer<typeof servicesSchemaZod>
export type ServiceEditSchemaZodType = z.infer<typeof servicesEditSchemaZod>