import {prisma} from "@/src/lib/prisma";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { idd } = data;

    const task = await prisma.task.findMany({
      where: { id: idd },
      select: {
        id: true,    
        name: true,
        assignedToId: true,
        status: true,
        completionDate:true,
        startDate:true,
        dueDate:true,
        description: true,
        remarks:true,
      },
    });

 

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("Error fetching user projects:", error);
    return NextResponse.json(
      { message: "Failed to fetch user projects" },
      { status: 500 }
    );
  }
}
