import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "../../auth/[...nextauth]/config"; // Your next-auth config
import { prisma } from "@/src/lib/prisma";


export const dynamic = "force-dynamic";

// GET: Fetch all projects for the logged-in user
export async function GET() {
  const session = await getServerSession(authConfig);
  try {
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      where: { ownerId: session.user.id },
      orderBy: { startDate: "desc" },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
