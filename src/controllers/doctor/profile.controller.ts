
import { DoctorProfile } from "../../models/doctor/doctorProfile.model";
import { validateRequest } from "../../utils";
import { DoctorProfileSchemaType, doctorProfileSchemaZod, doctorProfileUpdateSchemaZod } from "../../validation/doctor/doctorProfileSchemaZod";
import { Request, Response } from "express";

export const handleAddProfile = async (
  req: Request<{}, {}, DoctorProfileSchemaType>,
  res: Response
) => {
  try{
    const alreadyExistProfile = await DoctorProfile.findOne({doctorId:req.body.doctorId});


    const {success, data} = await validateRequest(alreadyExistProfile ? doctorProfileUpdateSchemaZod: doctorProfileSchemaZod, req.body);

    if(!success){
      return res.customResponse(400, "fields are not valid", data);
    }

    const {
      doctorId,
      degree,
      description,
      availableTimingSlots,
      price,
      currentOrganization,
      services,
      experience,
    } = data;


    if(alreadyExistProfile){
      const updatedProfile = await DoctorProfile.findOneAndUpdate(
        {doctorId},
        { $set: data},
        {new:true}
      )
      return res.customResponse(200,"Profile updated successfully",updatedProfile!);
    }

  
    const doctorProfile = await DoctorProfile.create({
      doctorId,
      degree,
      description,
      availableTimingSlots,
      price,
      currentOrganization:currentOrganization || "",
      services,
      experience,
    });
    
     res.customResponse(201,"Profile added successfully",doctorProfile);
  }catch(err){
    res.customResponse(500, "Internal server error");
  }
};
