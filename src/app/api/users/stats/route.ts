import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/app/api/auth/[...nextauth]/config";
import { prisma } from "@/src/lib/prisma";
import { endOfWeek, startOfWeek } from "date-fns";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const userEmail = session.user.email;

    // Get assigned tasks
    const assignedTasks = await prisma.task.findMany({
      where: {
        assignedTo: {
          email: userEmail,
        },
      },
      select: {
        id: true,
        dueDate: true,
        status: true,
        projectId: true,
      },
    });

    const currentWeekStart = startOfWeek(new Date());
    const currentWeekEnd = endOfWeek(new Date());

    const dueThisWeek = assignedTasks.filter(
      (task) =>
        task.dueDate &&
        new Date(task.dueDate) >= currentWeekStart &&
        new Date(task.dueDate) <= currentWeekEnd
    );

    const overdueTasks = assignedTasks.filter(
      (task) =>
        task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        task.status !== "COMPLETED"
    );

    const projectIds = new Set(assignedTasks.map((task) => task.projectId));

    return NextResponse.json({
      assignedTasks: assignedTasks.length,
      dueThisWeek: dueThisWeek.length,
      overdueTasks: overdueTasks.length,
      totalProjects: projectIds.size,
    });
  } catch (error) {
    console.error("Error in user stats:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
