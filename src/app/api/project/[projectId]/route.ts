import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        id: true,
        name: true,
        startDate: true,
        dueDate: true,
        type: true,
        status: true,
        owner: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { message: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
