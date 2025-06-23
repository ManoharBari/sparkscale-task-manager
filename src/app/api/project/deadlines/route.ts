import {prisma} from "@/src/lib/prisma";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        startDate: true,
        dueDate: true,
        status:true,
      },
    });

    const result = projects.map(project => {
        const start = new Date(project.startDate);
        const due = new Date(project.dueDate);
        const msInDay = 1000 * 60 * 60 * 24;
  
        const daysLeft = Math.ceil((due.getTime() - start.getTime()) / msInDay);
  
        return {
          ...project,
          daysLeft,
        };
      });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}