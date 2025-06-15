import { getServerSession } from "next-auth";
import { authConfig } from "../../auth/[...nextauth]/config";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        assignedToId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        project: true, 
      },
    });

    return new Response(JSON.stringify(tasks), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
