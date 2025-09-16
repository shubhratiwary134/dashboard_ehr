import { NextResponse } from "next/server";
import {
  getPatientAllergies,
  updatePatientAllergies,
} from "@/services/modmed.service";

export async function GET(
  request: Request,
  { params }: { params: { patientId: string } }
) {
  try {
    const { patientId } = params;
    const allergies = await getPatientAllergies(patientId);
    return NextResponse.json(allergies, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch patient allergies" },
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
    const allergyData = await request.json();
    const updatedAllergies = await updatePatientAllergies(
      patientId,
      allergyData
    );
    return NextResponse.json(updatedAllergies, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update patient allergies" },
      { status: 500 }
    );
  }
}
