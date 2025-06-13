import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.task.groupBy({
      by: ["projectId"],
      _count: {
        id: true,
      },
    });

    const projectIds = data.map((d) => d.projectId);
    const projectNames = await prisma.project.findMany({
      where: { id: { in: projectIds } },
      select: { id: true, name: true },
    });

    const response = data.map((item) => {
      const project = projectNames.find((p) => p.id === item.projectId);
      return {
        name: project?.name || "Unknown Project",
        tasks: item._count.id,
      };
    });

    return NextResponse.json(response);
  } catch (err) {
    console.error("Failed to fetch tasks by project:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
