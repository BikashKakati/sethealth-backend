import { Request, Response } from "express";
import { validateRequest } from "../../utils";
import { CreateAppointmentSchemaZod } from "../../validation/patient/createAppointmentSchema";
import { Appointments } from "../../models/appointment.model";

export const handleCreateAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { success, data } = await validateRequest(
      CreateAppointmentSchemaZod,
      req.body
    );
    if (!success) {
      return res.customResponse(400, "fields are not valid", data);
    }

    const {
      doctorId,
      slot,
      patientId,
      service,
      symptoms,
      existingPrescriptions,
      serviceType,
      appointmentStatus,
      paymentStatus,
      appointmentFee,
      newPrescriptions,
      review,
      paymentId,
    } = req.body;

    const appointment = new Appointments({
      doctorId,
      slot,
      patientId,
      service,
      symptoms,
      existingPrescriptions,
      serviceType,
      appointmentStatus,
      paymentStatus,
      appointmentFee,
      newPrescriptions,
      review,
      paymentId,
    });

    await appointment.save();

    res.customResponse(
      200,
      "Your appointment has been successfully scheduled.",
      appointment
    );
  } catch (err) {
    res.customResponse(500, "Server error");
  }
};
