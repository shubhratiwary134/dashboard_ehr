import { NextResponse } from "next/server";
import { searchModMedPatients } from "@/services/modmed.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    const patients = await searchModMedPatients(params);
    return NextResponse.json(patients, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to search patients" },
      { status: 500 }
    );
  }
}
