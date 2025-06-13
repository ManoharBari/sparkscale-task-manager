import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/app/api/auth/[...nextauth]/config"; // adjust path as needed

export async function GET(req: Request) {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.isAdmin) {
    return NextResponse.json({ message: "Access Denied: Admins only." }, { status: 403 });
  }

  return NextResponse.json({ message: "Welcome Admin" });
}
