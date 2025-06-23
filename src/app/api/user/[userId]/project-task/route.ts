// app/api/user/[userId]/projects-tasks/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  const ownedProjects = await prisma.project.findMany({
    where: { ownerId: userId },
    select: {
      id: true,
      name: true,
      status: true,
      dueDate: true,
      tasks: {
        select: { status: true },
      },
    },
  });

  const formattedProjects = ownedProjects.map((p) => {
    const tasksCount = p.tasks.length;
    const completedTasksCount = p.tasks.filter(
      (t) => t.status === "COMPLETED"
    ).length;
    return {
      id: p.id,
      name: p.name,
      status: p.status,
      dueDate: p.dueDate,
      tasksCount,
      completedTasksCount,
    };
  });

  const assignedTasks = await prisma.task.findMany({
    where: { assignedToId: userId },
    select: {
      id: true,
      name: true,
      status: true,
      dueDate: true,
      project: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return NextResponse.json({ ownedProjects: formattedProjects, assignedTasks });
}
