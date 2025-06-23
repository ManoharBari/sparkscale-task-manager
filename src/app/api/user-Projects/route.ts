import {prisma} from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id } = data;

    const project = await prisma.project.findMany({
      where: { id: id },
      select: {
        id: true,    
        name: true,
        ownerId:true,
        status: true,
        dueDate:true,
        startDate:true,
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
