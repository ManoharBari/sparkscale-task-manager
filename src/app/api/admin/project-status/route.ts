import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/app/api/auth/[...nextauth]/config";
import { prisma } from "@/src/lib/prisma";
import { Status } from "@prisma/client"; 

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.isAdmin) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const statuses = [
      Status.ONGOING,
      Status.COMPLETED,
      Status.DELAYED,
      Status.ON_HOLD,
    ];

    const counts = await Promise.all(
      statuses.map(async (status) => {
        const count = await prisma.project.count({ where: { status } });
        return { name: status, value: count };
      })
    );

    return NextResponse.json({ data: counts });
  } catch (error) {
    console.error("Project status fetch error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
