import {prisma} from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "../../auth/[...nextauth]/config";


export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authConfig);

    if (!session || !session.user || !session.user.isAdmin) {
      return NextResponse.json(
        { message: "You are not authorized to add this project" },
        { status: 403 }
      );
    }

    const projectData = await req.json();
    const { name, startDate, dueDate, Owner, status, type } = projectData;

    if (!name || !startDate || !dueDate || !Owner || !status || !type) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const owner = await prisma.user.findUnique({
      where: { email: Owner },
    });

    if (!owner) {
      return NextResponse.json({ message: "owner not found" }, { status: 404 });
    }

    const project = await prisma.project.create({
      data: {
        name,
        ownerId: owner.id,
        startDate: new Date(startDate),
        dueDate: new Date(dueDate),
        status: status,
        type: type,
      },
    });

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { message: "Failed to update project" },
      { status: 500 }
    );
  }
}
