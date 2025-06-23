import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma"; 


export const dynamic = "force-dynamic";

// GET - Fetch recently joined users (joined in last 30 days, or customize)
export async function GET() {
  try {
    const recentUsers = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(recentUsers);
  } catch (error) {
    console.error("Error fetching recently joined users:", error);
    return NextResponse.json(
      { error: "Failed to fetch recently joined users" },
      { status: 500 }
    );
  }
}

