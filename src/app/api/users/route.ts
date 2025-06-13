import {prisma} from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Fetch users where 'deleted' field is false
    const users = await prisma.user.findMany({
      where: {
        deleted: false, 
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { message: "Failed to fetch users", error: errorMessage },
      { status: 500 }
    );
  }
}