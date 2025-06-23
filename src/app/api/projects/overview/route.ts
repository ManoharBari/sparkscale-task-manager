import { getServerSession } from "next-auth";
import { authConfig } from "@/src/app/api/auth/[...nextauth]/config";
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const projects = await prisma.project.findMany({
      where: {
        ownerId: userId,
      },
    });

    const tasks = await prisma.task.findMany({
      where: {
        assignedToId: userId,
      },
    });

    console.log({ projects, tasks });
    return NextResponse.json({ projects, tasks });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
