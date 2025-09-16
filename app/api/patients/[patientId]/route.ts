import { NextResponse } from "next/server";
import {
  getModMedPatientById,
  updateModMedPatient,
} from "@/services/modmed.service";

export async function GET(
  request: Request,
  { params }: { params: { patientId: string } }
) {
  try {
    const { patientId } = params;
    const patient = await getModMedPatientById(patientId);
    return NextResponse.json(patient, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch patient" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { patientId: string } }
) {
  try {
    const { patientId } = params;
    const patientData = await request.json();
    const updatedPatient = await updateModMedPatient(patientId, patientData);
    return NextResponse.json(updatedPatient, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update patient" },
      { status: 500 }
    );
  }
}
