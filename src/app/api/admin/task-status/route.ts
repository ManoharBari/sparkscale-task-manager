import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/app/api/auth/[...nextauth]/config";
import { prisma } from "@/src/lib/prisma";
import { Status } from "@prisma/client";

// export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.isAdmin) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const statuses = [
      Status.NEW,
      Status.ONGOING,
      Status.COMPLETED,
      Status.ON_TRACK,
      Status.DELAYED,
    ];

    const data = await Promise.all(
      statuses.map(async (status) => {
        const count = await prisma.task.count({ where: { status } });
        return { name: status, count };
      })
    );

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching task status:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
