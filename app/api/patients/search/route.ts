import { NextResponse } from "next/server";
import { getModMedPatients } from "@/services/modmed.service";

export async function GET() {
  try {
    const patients = await getModMedPatients();
    return NextResponse.json(patients, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}
