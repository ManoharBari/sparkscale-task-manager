// pages/api/projects.ts
import {prisma} from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "../auth/[...nextauth]/config";


export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const session = await getServerSession(authConfig);

  if (session.user.isAdmin) {
    const projects = await prisma.project.findMany({
      include: {
        owner: {
          select: {
            email: true,
          },
        },
        tasks: {
          orderBy: {
            dueDate: "asc",
          },
          include: {
            assignedTo: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    // Add completedTasksCount and tasksCount to each project
    const projectsWithCounts = projects.map((project) => {
      const completedTasksCount = project.tasks.filter((task) => task.status === "COMPLETED").length;
      const tasksCount = project.tasks.length;
      return {
        ...project,
        completedTasksCount,
        tasksCount,
      };
    });

    return NextResponse.json(projectsWithCounts, { status: 200 });
  }

  // Repeat the same for the non-admin case
  try {
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { ownerId: session.user.id },
          { tasks: { some: { assignedToId: session.user.id } } },
        ],
      },
      include: {
        owner: {
          select: {
            email: true,
          },
        },
        tasks: {
          include: {
            assignedTo: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    // Add counts here as well
    const projectsWithCounts = projects.map((project) => {
      const completedTasksCount = project.tasks.filter((task) => task.status === "COMPLETED").length;
      const tasksCount = project.tasks.length;
      return {
        ...project,
        completedTasksCount,
        tasksCount,
      };
    });

    return NextResponse.json(projectsWithCounts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

