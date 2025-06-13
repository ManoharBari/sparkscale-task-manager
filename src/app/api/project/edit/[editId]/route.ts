import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { Type, Status } from "@prisma/client";

type Params = { editId: string }; // keep things tidy
type Body = {
  ownerEmail: string;
  name: string;
  description: string;
  dueDate: string;
  startDate: string;
  type: Type;
  status: Status;
};

export async function PATCH(
  req: Request, // ✅ Web Request
  { params }: { params: Promise<Params> } // ✅ Promise-wrapped params
) {
  const { editId } = await params; // 👈 unwrap the promise
  const body: Body = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email: body.ownerEmail },
    });

    const updatedTask = await prisma.project.update({
      where: { id: editId },
      data: {
        name: body.name,
        dueDate: new Date(body.dueDate),
        startDate: new Date(body.startDate),
        type: body.type,
        status: body.status,
        ownerId: user?.id,
      },
    });

    return NextResponse.json({ task: updatedTask });
  } catch (err) {
    console.error("Update failed:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
