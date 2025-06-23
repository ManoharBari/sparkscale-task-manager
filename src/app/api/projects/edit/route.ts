import {prisma} from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/app/api/auth/[...nextauth]/config";


export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authConfig);

    if (!session || !session.user || !session.user.isAdmin) {
      return NextResponse.json(
        { message: "You are not authorized to edit this project" },
        { status: 403 }
      );
    }

    const projectData = await req.json();
    const { projectId, name, startDate, dueDate, status, Owner } = projectData;

    if (!projectId || !name || !startDate || !dueDate || !status || !Owner) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const owner = await prisma.user.findUnique({
      where: {
        email: Owner,
      },
    });

    if (!owner) {
      return NextResponse.json({ message: "Owner not found" }, { status: 400 });
    }

    // Update the project in the database using Prisma
    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        name,
        startDate: new Date(startDate),
        dueDate: new Date(dueDate),
        status: status,
        ownerId: owner.id,
      },
    });

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { message: "Failed to update project" },
      { status: 500 }
    );
  }
}
