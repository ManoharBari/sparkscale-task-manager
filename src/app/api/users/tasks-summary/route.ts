import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/app/api/auth/[...nextauth]/config";
import { prisma } from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const userEmail = session.user.email;

    const tasks = await prisma.task.findMany({
      where: {
        assignedTo: {
          email: userEmail,
        },
      },
      select: {
        status: true,
      },
    });

    const summary = {
      completed: 0,
      inProgress: 0,
      notStarted: 0,
    };

    for (const task of tasks) {
      if (task.status === "COMPLETED") summary.completed++;
      else if (task.status === "ONGOING") summary.inProgress++;
      else summary.notStarted++;
    }

    return NextResponse.json(summary);
  } catch (error) {
    console.error("Error fetching task summary:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
