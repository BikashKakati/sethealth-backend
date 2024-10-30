import { Services } from "../../models/services.modal";
import { Request, Response } from "express";

export const handleCreateServices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { serviceName, symptoms } = req.body;

    
    const alreadyExistData = await Services.findOne({serviceName});
    if(alreadyExistData){
        return res.customResponse(400,"Service Name already exist");
    }


    const newService = await Services.create({ serviceName, symptoms });
    return res.customResponse(201, "Service created successfully", newService);
  } catch (err:any) {
    return res.customResponse(500,"Internal server error");
  }
};
