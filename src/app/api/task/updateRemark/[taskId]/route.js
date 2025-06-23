import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";


export const dynamic = "force-dynamic";

export async function PATCH(req, { params }) {
  try {
    const taskId = params.taskId;
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json(
        { error: "Remark is required" },
        { status: 400 }
      );
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating remark:", error);
    return NextResponse.json(
      { error: "Failed to update remark" },
      { status: 500 }
    );
  }
}
