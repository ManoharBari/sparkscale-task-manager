import {prisma} from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id } = data;

    if (!id) {
      return NextResponse.json({ message: "Missing user ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });

  } catch (error) {
    console.error("Error fetching user ", error);
    return NextResponse.json(
      { message: "Failed to fetch user " },
      { status: 500 }
    );
  }
}
