import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const completed = await prisma.task.count({
      where: { status: "COMPLETED" },
    });
    const inProgress = await prisma.task.count({
      where: { status: { in: ["NEW", "ON_TRACK", "ONGOING"] } },
    });
    const delayed = await prisma.task.count({
      where: { status: { in: ["DELAYED", "ON_HOLD"] } },
    });

    return NextResponse.json({
      completed,
      inProgress,
      delayed,
    });
  } catch (err) {
    console.error("Failed to fetch task summary:", err);
    return NextResponse.json(
      { error: "Failed to fetch task summary" },
      { status: 500 }
    );
  }
}
