import {prisma} from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "../../auth/[...nextauth]/config";


export const dynamic = "force-dynamic";

// Function to validate email format using regex
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(req: Request) {
  try {
    // Get the session for user authentication and authorization
    const session = await getServerSession(authConfig);

    // Check if the session exists and the user is an admin
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "You are not authorized to add this project" },
        { status: 403 }
      );
    }

    const projectData = await req.json();
    const { name, type, ownerEmail, startDate, dueDate, status } = projectData;

    if (!name || !startDate || !dueDate || !ownerEmail || !status || !type) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!isValidEmail(ownerEmail)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    const owner = await prisma.user.findUnique({
      where: { email: ownerEmail },
    });

    if (!owner) {
      return NextResponse.json({ message: "Owner not found" }, { status: 404 });
    }

    const project = await prisma.project.create({
      data: {
        name,
        ownerId: owner.id, 
        startDate: new Date(startDate), 
        dueDate: new Date(dueDate),
        status,
        type,
      },
    });

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error creating project:", error);
    
    // Type guard for error object
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    
    return NextResponse.json(
      { message: "Failed to create project", error: errorMessage },
      { status: 500 }
    );
  }
}
