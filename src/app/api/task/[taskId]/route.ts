import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await params;

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
      select: {
        dueDate: true,
        startDate: true,
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        projectId: true,
        id: true,
        remarks: true,
        status: true,
        name: true,
        description: true,
        assignedTo: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json(
      { message: "Failed to fetch task" },
      { status: 500 }
    );
  }
}
