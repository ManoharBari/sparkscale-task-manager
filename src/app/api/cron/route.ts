import "@/src/lib/utils"; // Ensures the cron job starts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Cron job is running" }, { status: 200 });
}
