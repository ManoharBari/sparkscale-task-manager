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
    const userId = session.user.id;

    const tasks = await prisma.task.findMany({
      where: {
        assignedToId: userId,
        dueDate: {
          not: undefined,
        },
      },
      orderBy: {
        dueDate: "asc",
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take: 5, // limit to upcoming 10 deadlines
    });

    console.log(tasks);
    const filtered = tasks.map((t) => ({
      id: t.id,
      name: t.name,
      dueDate: t.dueDate?.toISOString(),
      projectId: t.projectId,
    }));

    return NextResponse.json(filtered);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to load deadlines" },
      { status: 500 }
    );
  }
}
