import { Request, Response } from "express";
import { RegisteredUsers } from "../../models/register.model";

export const handleGetAllDoctors = async (req: Request, res: Response) => {
  try {
    const allDoctors = await RegisteredUsers.find({ role: "doctor" });
    res.customResponse(200, "All doctors are here", allDoctors);
  } catch (err: any) {
    res.customResponse(400, `Failed to fetch doctors:${err.message}`);
  }
};

export const handleGetDoctorById = async (req: Request, res: Response) => {
  try {
    const doctorInfo = await RegisteredUsers.findById(req.params.id);
    res.customResponse(
      200,
      `Fetched details of ${doctorInfo?.name}`,
      doctorInfo!
    );
  } catch (err: any) {
    res.customResponse(400, `Failed to fetch details`);
  }
};
