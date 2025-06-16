import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const [adminCount, userCount] = await Promise.all([
      prisma.user.count({ where: { isAdmin: true } }),
      prisma.user.count({ where: { isAdmin: false } }),
    ]);

    return NextResponse.json({
      admin: adminCount,
      user: userCount,
    });
  } catch (error) {
    console.error("Error fetching user type distribution:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
