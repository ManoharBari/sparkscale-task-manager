import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { subMonths, startOfMonth, endOfMonth, format } from "date-fns";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const months = 6;
    const today = new Date();

    const results = [];

    for (let i = months - 1; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(today, i));
      const monthEnd = endOfMonth(subMonths(today, i));
      const label = format(monthStart, "MMM"); // e.g., "Jan"

      // Fetch all completed tasks due this month
      const tasks = await prisma.task.findMany({
        where: {
          status: "COMPLETED",
          dueDate: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
        select: {
          completionDate: true,
          dueDate: true,
        },
      });

      const onTime = tasks.filter(
        (task) => task.completionDate && task.completionDate <= task.dueDate
      ).length;

      const delayed = tasks.length - onTime;

      results.push({ month: label, onTime, delayed });
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error in completion trends API:", error);
    return NextResponse.json(
      { message: "Failed to generate trends" },
      { status: 500 }
    );
  }
}
