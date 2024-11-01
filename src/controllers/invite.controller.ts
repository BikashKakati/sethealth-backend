import { Request, Response } from "express";
import { DoctorInvite } from "../models/doctor/doctorInvite.model";
import { RegisteredUsers } from "../models/register.model";
import path from "path";
import { sendEmail } from "../utils";

export const handleInvite = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email } = req.body;
    const userEmail = req?.user?.email;

    const invitedUser = await DoctorInvite.findOne({ email });
    if (invitedUser) {
      return res.customResponse(400, "User already invited");
    }

    const newInvite = new DoctorInvite({ name, email, invitedBy: userEmail });
    await newInvite.save();

    const inviteLink = `http:/localhost:3000/register?email=${encodeURIComponent(
      email
    )}`;
    const templatePath = path.join(
      __dirname,
      "../views/emailTemplates/inviteTemplate.ejs"
    );

    await sendEmail(
      userEmail,
      email,
      "You're Invited to Join as Doctor",
      templatePath,
      {
        name,
        inviteLink,
      }
    );
    return res.customResponse(200, "Invitation sent successfully");
  } catch (err) {
    console.error("Error handling invite:", err);
    return res.customResponse(500, "Error sending invitation");
  }
  return res.customResponse(200, "success");
};
