import { DoctorProfile } from "../../models/doctor/doctorProfile.model";
import { DoctorProfileSchemaType } from "../../validation/doctor/doctorProfileSchemaZod";
import { Request, Response } from "express";

export const handleAddProfile = async (
  req: Request<{}, {}, DoctorProfileSchemaType>,
  res: Response
) => {
  const {
    doctorId,
    degree,
    description,
    availableTimingSlots,
    price,
    currentOrganization,
    services,
    experience,
  } = req.body;

  const doctorProfile = await DoctorProfile.create({
    degree,
    description,
    availableTimingSlots,
    price,
    currentOrganization:currentOrganization || "",
    services,
    experience,
  });
   res.customResponse(201,"Profile added successfully",doctorProfile);
};
