import { Services } from "../../models/services.model";
import { Request, Response } from "express";
import { validateRequest } from "../../utils";
import { servicesSchemaZod } from "../../validation/admin/servicesSchemaZod";

export const handleCreateServices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {success, data} = await validateRequest(servicesSchemaZod,req.body);
    if (!success) {
      return res.customResponse(400, "fields are not valid", data);
    }
    const { serviceName, symptoms } = data;

    
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

export const handleGetAllServices = async(req:Request,res:Response)=>{
  try{
    const allServices = await Services.find({});
    res.customResponse(200, "All services is here", allServices);
  }catch(err){
    return res.customResponse(500,"Internal server error");
  }
}
