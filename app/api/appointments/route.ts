import { NextResponse } from "next/server";
import {
  getAppointments,
  bookAppointment,
  getProviderSchedules,
} from "@/services/modmed.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    const appointments = await getAppointments(params);
    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const appointmentData = await request.json();
    const { providerId, startTime, endTime } = appointmentData;

    const scheduleParams = {
      providerId,
      startDate: startTime,
      endDate: endTime,
    };

    const schedules = await getProviderSchedules(scheduleParams);

    const isAvailable = checkTimeSlotAvailability(
      schedules,
      startTime,
      endTime
    );

    if (!isAvailable) {
      return NextResponse.json(
        { error: "Time slot is not available" },
        { status: 409 }
      );
    }

    const appointment = await bookAppointment(appointmentData);
    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to book appointment" },
      { status: 500 }
    );
  }
}

function checkTimeSlotAvailability(
  schedules: any,
  startTime: string,
  endTime: string
): boolean {
  return true;
}
