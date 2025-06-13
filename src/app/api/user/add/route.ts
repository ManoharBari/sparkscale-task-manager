import {prisma} from "@/src/lib/prisma"; 
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Received data:", data);

    const createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        isAdmin: data.isAdmin ?? false,
        createdAt,
        weekOff: data.weekOff || [],
        deleted: false,
        joiningDate: createdAt,
        resignationDate: null,
      }
    });

    return NextResponse.json({ message: "User created successfully", user });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: "Failed to create user", error: String(error) }, { status: 500 });
  }
}
