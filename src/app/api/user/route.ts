import { prisma } from "@/src/lib/prisma"; 
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        deleted: false,
      },
      select: {
        id: true,
        email: true,
        weekOff: true,
        isAdmin: true,
        createdAt: true,
        joiningDate: true,
        resignationDate: true,
      },
    });

    const data = await Promise.all(
      users.map(async (user) => {
        const totalProjects = await prisma.project.count({
          where: {
            ownerId: user.id,
          },
        });

        const totalTasks = await prisma.task.count({
          where: {
            assignedToId: user.id,
          },
        });

        return {
          id: user.id,
          email: user.email,
          weekOff: user.weekOff || [],
          isAdmin: user.isAdmin,
          joiningDate: user.joiningDate,
          resignationDate: user.resignationDate,
          totalProjects,
          totalTasks,
          createdAt: user.createdAt,
        };
      })
    );

    return NextResponse.json({ users: data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// Create a new user (POST)
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, password, weekOff, joiningDate, resignationDate, isAdmin } =
      data;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        weekOff: Array.isArray(weekOff) ? weekOff : [],
        isAdmin: isAdmin ?? false,
        joiningDate: joiningDate ? new Date(joiningDate) : undefined,
        resignationDate: resignationDate
          ? new Date(resignationDate)
          : undefined,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { message: "User created", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}

// Update user (PUT)
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const {
      id,
      email,
      password,
      weekOff,
      joiningDate,
      resignationDate,
      isAdmin,
    } = data;

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updateData: any = {};

    if (email && email !== user.email) {
      updateData.email = email;
    }

    if (typeof isAdmin === "boolean") {
      updateData.isAdmin = isAdmin;
    }

    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    if (Array.isArray(weekOff)) {
      updateData.weekOff = weekOff;
    }

    if (joiningDate) {
      updateData.joiningDate = new Date(joiningDate);
    }

    if (resignationDate) {
      updateData.resignationDate = new Date(resignationDate);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      message: "User updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Failed to update user" },
      { status: 500 }
    );
  }
}

// Mark user as deleted (PATCH)
export async function PATCH(req: Request) {
  try {
    const data = await req.json();
    const { id, deleted } = data;

    if (!id || deleted === undefined) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { deleted },
    });

    return NextResponse.json({
      message: "User marked as deleted",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error marking user as deleted:", error);
    return NextResponse.json(
      { message: "Failed to delete user" },
      { status: 500 }
    );
  }
}
