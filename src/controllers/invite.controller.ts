import { Request, Response } from "express";

export const handleInvite = async (
  req: Request,
  res: Response
): Promise<void> => {
  return res.customResponse(200, "success");
};
