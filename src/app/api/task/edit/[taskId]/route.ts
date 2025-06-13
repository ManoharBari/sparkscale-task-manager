import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { Status } from "@prisma/client";

type Params = { taskId: string };
type Body = {
  name: string;
  description?: string;
  dueDate: string;
  status: Status;
  projectId: string;
  assignedToId: string;
};

export async function PATCH(
  req: Request, // ✅ use `Request`, not `NextRequest`
  context: { params: Promise<Params> } // ✅ Promise<Params> is required
) {
  const { taskId } = await context.params; // ✅ await the params
  const body: Body = await req.json();

  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        name: body.name,
        description: body.description || "",
        dueDate: new Date(body.dueDate),
        status: body.status,
        projectId: body.projectId,
        assignedToId: body.assignedToId,
        startDate: new Date(), // consider if this should be the current time
      },
    });

    return NextResponse.json({ task: updatedTask });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
