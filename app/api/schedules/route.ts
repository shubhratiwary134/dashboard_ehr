import { NextResponse } from "next/server";
import { getProviderSchedules } from "@/services/modmed.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    const schedules = await getProviderSchedules(params);
    return NextResponse.json(schedules, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch provider schedules" },
      { status: 500 }
    );
  }
}
