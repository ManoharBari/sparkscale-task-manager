import {prisma} from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id } = data;

    if (!id) {
      return NextResponse.json(
        { message: "User ID not provided" },
        { status: 400 }
      );
    }

    const userProjects = await prisma.project.findMany({
      where: { ownerId: id },
      select: {
        id: true,
        name: true,
        type: true,
        startDate: true,
        dueDate: true,
        status: true,
      },
    });

    return NextResponse.json(userProjects, { status: 200 });
  } catch (error) {
    console.error("Error fetching user projects:", error);
    return NextResponse.json(
      { message: "Failed to fetch user projects" },
      { status: 500 }
    );
  }
}
