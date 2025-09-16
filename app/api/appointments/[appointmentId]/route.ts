import { NextResponse } from "next/server";
import {
  rescheduleAppointment,
  cancelAppointment,
} from "@/services/modmed.service";

export async function PUT(
  request: Request,
  { params }: { params: { appointmentId: string } }
) {
  try {
    const { appointmentId } = params;
    const updateData = await request.json();

    const updatedAppointment = await rescheduleAppointment(
      appointmentId,
      updateData
    );
    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to reschedule appointment" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { appointmentId: string } }
) {
  try {
    const { appointmentId } = params;

    const result = await cancelAppointment(appointmentId);
    return NextResponse.json(
      { message: "Appointment canceled successfully", ...result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to cancel appointment" },
      { status: 500 }
    );
  }
}
