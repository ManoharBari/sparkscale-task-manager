import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/app/api/auth/[...nextauth]/config";
import { prisma } from "@/src/lib/prisma";


export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authConfig);
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;

  try {
    // Fetch recent tasks created by or assigned to user
    const tasks = await prisma.task.findMany({
      where: { assignedToId: userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    // Fetch recent projects created by the user
    const projects = await prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const activities = [
      ...tasks.map((task) => ({
        id: `task-${task.id}`,
        type: "TASK_CREATED",
        description: `You created task '${task.name}'`,
        project: "N/A", // If tasks don't belong to a project
        timestamp: task.createdAt,
        user: {
          name: session.user.name || "You",
          avatar: session.user.image || "/placeholder.svg",
        },
      })),
      ...projects.map((project) => ({
        id: `project-${project.id}`,
        type: "PROJECT_CREATED",
        description: `You created project '${project.name}'`,
        project: project.name,
        timestamp: project.createdAt,
        user: {
          name: session.user.name || "You",
          avatar: session.user.image || "/placeholder.svg",
        },
      })),
    ];

    // Sort by timestamp (latest first)
    activities.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({ activities });
  } catch (err) {
    console.error("[ACTIVITY_API_ERROR]", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
