// import prisma from '@/db';
// import bcrypt from 'bcryptjs';
// import { NextRequest, NextResponse } from 'next/server';

// export async function PATCH(req: NextRequest, { params }: { params: { editId: string } }) {
//   const id = params.editId;
//   const body = await req.json();

//   try {
//     console.log("PATCH Body:", body);

//     const updatedUser = await prisma.user.update({
//       where: { id },
//       data: {
//         email: body.email,
//         weekOff: body.weekOff,
//         isAdmin: body.isAdmin,
//         createdAt: body.createdAt ? new Date(body.createdAt) : undefined,
//         joiningDate: body.createdAt ? new Date(body.createdAt) : undefined,
//         resignationDate: body.resignationDate ? new Date(body.resignationDate) : null,
//       },
//     });

//     if (body.password) {
//       const hashedPassword = await bcrypt.hash(body.password, 10);
//       await prisma.user.update({
//         where: { id },
//         data: { password: hashedPassword },
//       });
//     }

//     return NextResponse.json({ user: updatedUser });
//   } catch (error) {
//     console.error("Update failed:", error);
//     return NextResponse.json({ error: "Update failed", detail: String(error) }, { status: 500 });
//   }
// }
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

type Params = { editId: string };

export async function PATCH(
  req: Request, // ✅ Web-standard Request
  context: { params: Promise<Params> } // ✅ Promise-wrapped params
) {
  const { editId } = await context.params;
  const body = await req.json();

  try {
    console.log("PATCH Body:", body);

    const updatedUser = await prisma.user.update({
      where: { id: editId },
      data: {
        email: body.email,
        weekOff: body.weekOff,
        isAdmin: body.isAdmin,
        createdAt: body.createdAt ? new Date(body.createdAt) : undefined,
        joiningDate: body.createdAt ? new Date(body.createdAt) : undefined,
        resignationDate: body.resignationDate
          ? new Date(body.resignationDate)
          : null,
      },
    });

    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      await prisma.user.update({
        where: { id: editId },
        data: { password: hashedPassword },
      });
    }

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json(
      { error: "Update failed", detail: String(error) },
      { status: 500 }
    );
  }
}
