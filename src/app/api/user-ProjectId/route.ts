import {prisma} from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id } = data;

    const project = await prisma.task.findMany({
      where: { projectId: id },
      select: {
        id: true,    
        name: true,
        assignedToId: true,
        status: true,
        completionDate:true,
        startDate:true,
        dueDate:true,
        description: true,
        projectId:true,
      },
    });

 

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error fetching user projects:", error);
    return NextResponse.json(
      { message: "Failed to fetch user projects" },
      { status: 500 }
    );
  }
}
