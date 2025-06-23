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
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        assignedTo: {
          select: {
            email: true,
          },
        },
        project: {
          select: {
            name: true,
          },
        },
      },
    });

    const data = tasks.map((task) => ({
      id: task.id,
      name: task.name,
      status: task.status,
      dueDate: task.dueDate,
      assignedToId: {
        email: task.assignedTo?.email || "",
        avatar: "/placeholder.svg",
      },
      project: task.project?.name || "General",
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching recent tasks:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
