// pages/api/projects.ts
import {prisma} from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany({
      where: {
        projectsOwned: {
          some: {},
        },
      },
      select: {
        id: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        projectsOwned: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Return the fetched users as JSON
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching owners:", error);
    return NextResponse.json(
      { message: "Failed to fetch owners" },
      { status: 500 }
    );
  }
}