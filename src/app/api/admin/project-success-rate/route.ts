import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

// IMPORTANT: Enables fresh data each time
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await prisma.project.findMany();

    const statusCounts = {
      NEW: 0,
      ONGOING: 0,
      ON_TRACK: 0,
      DELAYED: 0,
      ON_HOLD: 0,
      COMPLETED: 0,
      CANCELLED: 0,
    };

    projects.forEach((p) => {
      if (statusCounts[p.status] !== undefined) {
        statusCounts[p.status] += 1;
      }
    });

    const data = [
      {
        name: "On Time",
        value:
          statusCounts["NEW"] +
          statusCounts["ONGOING"] +
          statusCounts["ON_TRACK"] +
          statusCounts["COMPLETED"],
        color: "#22c55e",
      },
      {
        name: "Delayed",
        value: statusCounts["DELAYED"] + statusCounts["ON_HOLD"],
        color: "#f59e0b",
      },
      {
        name: "Failed",
        value: statusCounts["CANCELLED"],
        color: "#ef4444",
      },
    ];

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching project stats" },
      { status: 500 }
    );
  }
}
