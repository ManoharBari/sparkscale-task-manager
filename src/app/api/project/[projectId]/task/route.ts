import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;

    const tasks = await prisma.task.findMany({
      where: { projectId },
      include: {
        assignedTo: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch project tasks" },
      { status: 500 }
    );
  }
}
