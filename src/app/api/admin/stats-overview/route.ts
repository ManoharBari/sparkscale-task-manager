import { getServerSession } from "next-auth";
import { authConfig } from "@/src/app/api/auth/[...nextauth]/config";
import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.isAdmin) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const totalUsers = await prisma.user.count();
    const activeProjects = await prisma.project.count({
      where: { status: { in: ["NEW", "ON_TRACK", "ONGOING"] } },
    });
    const totalTasks = await prisma.task.count();
    const delayedTasks = await prisma.task.count({
      where: {
        status: { in: ["DELAYED"] },
        dueDate: { lt: new Date() },
      },
    });

    const newUsersThisMonth = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    });

    const completedTasksThisWeek = await prisma.task.count({
      where: {
        status: { in: ["COMPLETED"] },
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    });

    const dueProjectsThisWeek = await prisma.project.count({
      where: {
        dueDate: {
          gte: new Date(),
          lte: new Date(new Date().setDate(new Date().getDate() + 7)),
        },
      },
    });

    return NextResponse.json({
      totalUsers,
      newUsersThisMonth,
      activeProjects,
      dueProjectsThisWeek,
      totalTasks,
      completedTasksThisWeek,
      delayedTasks,
    });
  } catch (error) {
    console.error("Stats fetch error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
