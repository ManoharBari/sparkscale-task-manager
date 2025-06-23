import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/app/api/auth/[...nextauth]/config";
import { prisma } from "@/src/lib/prisma";
import { subMonths, startOfMonth, endOfMonth, format } from "date-fns";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.isAdmin) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const today = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = subMonths(today, 5 - i);
      return {
        label: format(date, "MMM"),
        start: startOfMonth(date),
        end: endOfMonth(date),
      };
    });

    const data = await Promise.all(
      months.map(async ({ label, start, end }) => {
        const [createdCount, completedCount] = await Promise.all([
          prisma.task.count({
            where: {
              createdAt: {
                gte: start,
                lte: end,
              },
            },
          }),
          prisma.task.count({
            where: {
              status: "COMPLETED",
              createdAt: {
                gte: start,
                lte: end,
              },
            },
          }),
        ]);

        return {
          date: label,
          tasks: createdCount,
          completed: completedCount,
        };
      })
    );

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Task overview fetch error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
