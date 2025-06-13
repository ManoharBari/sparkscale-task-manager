import {prisma} from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id } = data;

    if (!id) {
      return NextResponse.json(
        { message: "User ID not provided" },
        { status: 400 }
      );
    }

    const project = await prisma.project.findMany({
      where: { ownerId: id },
      select: {
        id: true,    
        name: true,
      },
    });

    const userTask = await prisma.task.findMany({
      where: { assignedToId: id },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt:true,
        dueDate: true,
        status: true,
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },

    });

    return NextResponse.json({ project, userTask }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user projects:", error);
    return NextResponse.json(
      { message: "Failed to fetch user projects" },
      { status: 500 }
    );
  }
}
