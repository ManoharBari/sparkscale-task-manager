import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const taskGroups = await prisma.task.groupBy({
      by: ["assignedToId"],
      _count: {
        id: true,
      },
    });

    const userIds = taskGroups.map((group) => group.assignedToId);
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        email: true,
      },
    });

    const response = taskGroups.map((group, index) => {
      const user = users.find((u) => u.id === group.assignedToId);
      return {
        name: user?.email || "Unknown",
        tasks: group._count.id,
        avatar: "/placeholder.svg", // or generate avatars based on email if you use a service
      };
    });

    return NextResponse.json(response);
  } catch (err) {
    console.error("Error fetching tasks by assignee:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
