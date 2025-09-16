import { NextResponse } from "next/server";
import { getPatientMedications } from "@/services/modmed.service";

export async function GET(
  request: Request,
  { params }: { params: { patientId: string } }
) {
  try {
    const { patientId } = params;
    const medications = await getPatientMedications(patientId);
    return NextResponse.json(medications, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch patient medications" },
      { status: 500 }
    );
  }
}
