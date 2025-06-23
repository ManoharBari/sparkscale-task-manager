import { prisma } from "@/src/lib/prisma"; // Update path if needed
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, description, dueDate, status, projectId, assignedToId } =
      data;

    if (!name || !projectId || !assignedToId) {
      return NextResponse.json(
        { message: "Task name, project ID, and assignee ID are required" },
        { status: 400 }
      );
    }

    const [project, user] = await Promise.all([
      prisma.project.findUnique({ where: { id: projectId } }),
      prisma.user.findUnique({ where: { id: assignedToId } }),
    ]);

    if (!project || !user) {
      return NextResponse.json(
        { message: "Invalid project or user ID" },
        { status: 400 }
      );
    }

    const parsedDueDate = new Date(dueDate);
    if (isNaN(parsedDueDate.getTime())) {
      return NextResponse.json(
        { message: "Invalid due date" },
        { status: 400 }
      );
    }

    const newTask = await prisma.task.create({
      data: {
        name,
        description: description || "",
        dueDate: parsedDueDate,
        status,
        projectId,
        assignedToId: user.id,
        startDate: new Date(),
      },
    });

    return NextResponse.json(
      { message: "Task created successfully", newTask },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating task:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { message: "Failed to create task", error: error.message },
      { status: 500 }
    );
  }
}
