import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: true,
        assignedTo: true,
      },
    })
    return NextResponse.json(tasks)
  } catch (error) {
    console.error("Failed to fetch tasks:", error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
