import {prisma} from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const taskId = (await params).taskId;

    const existingTask = await prisma.task.delete({
      where: { id: taskId },
    });

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleteing task:", error);
    return NextResponse.json(
      { message: "Failed to deleteing task" },
      { status: 500 }
    );
  }
}
