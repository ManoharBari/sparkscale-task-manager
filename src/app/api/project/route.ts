import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";


export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Step 1: Get all projects
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        ownerId: true,
        type: true,
        startDate: true,
        dueDate: true,
        status: true,
        updatedAt: true,
      },
    });

    const projectIds = projects.map((project) => project.id);

    const tasks = await prisma.task.findMany({
      where: {
        projectId: { in: projectIds },
      },
      select: {
        projectId: true,
        status: true,
        // ownerId: true,
      },
    });

    const taskCounts: Record<string, { total: number; completed: number }> = {};

    for (const task of tasks) {
      if (!taskCounts[task.projectId]) {
        taskCounts[task.projectId] = { total: 0, completed: 0 };
      }

      taskCounts[task.projectId].total += 1;

      if (task.status === "COMPLETED") {
        taskCounts[task.projectId].completed += 1;
      }
    }

    const ownerIds = [...new Set(projects.map((p) => p.ownerId))];

    const users = await prisma.user.findMany({
      where: { id: { in: ownerIds } },
      select: { id: true, email: true },
    });

    const userEmails: Record<string, string> = {};
    for (const user of users) {
      userEmails[user.id] = user.email;
    }

    const result = projects.map((project) => {
      const counts = taskCounts[project.id] || { total: 0, completed: 0 };

      return {
        ...project,
        ownerEmail: userEmails[project.ownerId] || null,
        tasksCount: counts.total,
        completedTasksCount: counts.completed,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
