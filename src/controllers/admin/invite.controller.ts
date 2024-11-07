import { Request, Response } from "express";
import { DoctorInvite } from "../../models/doctor/doctorInvite.model";
import { RegisteredUsers } from "../../models/register.model";
import path from "path";
import { isInviteExpired, sendEmail, validateRequest } from "../../utils";
import { inviteSchemaZod } from "../../validation/admin/inviteSchemaZod";
import { adminClientUrl, doctorClientUrl } from "../../config";

export const handleInvite = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { success, data } = await validateRequest(inviteSchemaZod, req.body);
    if (!success) {
      return res.customResponse(400, "fields are not valid", data);
    }
    const { name, email } = data;
    const userEmail = req?.user?.email;

    const alreadyRegistered = await RegisteredUsers.findOne({ email });
    if (alreadyRegistered) {
      return res.customResponse(400, "User already registered");
    }

    const invitedUser = await DoctorInvite.findOne({ email });
    if (invitedUser && !isInviteExpired(invitedUser?.updatedAt, 2)) {
      return res.customResponse(400, "User already invited");
    }

    const inviteLink = `${doctorClientUrl}/register?email=${encodeURIComponent(
      email
    )}`;
    const templatePath = path.join(
      __dirname,
      "../../views/emailTemplates/inviteTemplate.ejs"
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

    const newInvite = new DoctorInvite({ name, email, invitedBy: userEmail });
    if (invitedUser) {
      invitedUser.updatedAt = new Date();
      await invitedUser.save();
    } else {
      await newInvite.save();
    }

    return res.customResponse(200, "Invitation sent successfully", newInvite);
  } catch (err) {
    return res.customResponse(500, "Error sending invitation");
  }
};
