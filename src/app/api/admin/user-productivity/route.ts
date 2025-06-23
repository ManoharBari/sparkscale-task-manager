import { prisma } from "@/src/lib/prisma"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: { deleted: false },
      select: {
        id: true,
        email: true,
        tasks: {
          select: {
            status: true,
          },
        },
      },
    })

    const result = users.map((user) => {
      const completed = user.tasks.filter((t) => t.status === "COMPLETED").length
      const inProgress = user.tasks.filter((t) =>
        ["ONGOING", "ON_TRACK"].includes(t.status)
      ).length

      return {
        name: user.email.split("@")[0], // fallback name from email
        completed,
        inProgress,
        avatar: "/placeholder.svg?height=32&width=32", // default avatar for now
      }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching user productivity", error)
    return NextResponse.json({ message: "Failed to fetch data" }, { status: 500 })
  }
}
