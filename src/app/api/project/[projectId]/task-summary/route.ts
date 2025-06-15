import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { projectId: string } }
) {
  try {
    const { projectId } = context.params;

    const completed = await prisma.task.count({
      where: { projectId, status: "COMPLETED" },
    });

    const inProgress = await prisma.task.count({
      where: {
        projectId,
        status: {
          in: ["NEW", "ON_TRACK", "ONGOING"],
        },
      },
    });

    const notStarted = await prisma.task.count({
      where: {
        projectId,
        status: {
          in: ["DELAYED", "ON_HOLD"],
        },
      },
    });

    return NextResponse.json({
      completed,
      inProgress,
      notStarted,
    });
  } catch (error) {
    console.error("Error fetching task summary:", error);
    return NextResponse.json(
      { message: "Failed to fetch task summary" },
      { status: 500 }
    );
  }
}
