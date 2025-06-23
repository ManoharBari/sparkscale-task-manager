import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/app/api/auth/[...nextauth]/config";
import { prisma } from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.isAdmin) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    // Fetch active tasks and group by user
    const tasks = await prisma.task.groupBy({
      by: ["assignedToId"],
      where: {
        status: {
          notIn: ["COMPLETED"], // Exclude completed tasks
        },
      },
      _count: {
        _all: true,
      },
    });

    // Fetch user names for the userIds
    const userIds = tasks.map((t) => t.assignedToId);
    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        email: true,
      },
    });

    const userMap = new Map(users.map((u) => [u.id, u.email || "Unnamed"]));

    const data = tasks.map((t) => ({
      name: userMap.get(t.assignedToId) || "Unknown",
      tasks: t._count._all,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching user workload:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
