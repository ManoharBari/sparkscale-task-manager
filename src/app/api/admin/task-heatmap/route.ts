import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";


export const dynamic = "force-dynamic";

export async function GET() {
  const startDate = new Date();
  console.log(startDate.setDate(startDate.getDate() - 7));
  startDate.setDate(startDate.getDate() - 7);
  const tasks = await prisma.task.findMany({
    where: {
      createdAt: {
        gte: startDate,
      },
    },
    select: {
      createdAt: true,
    },
  });

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const allowedHours = [9, 11, 13, 15, 17]; // Valid task hours (9AM to 5PM)

  const heatmapData: { day: string; hour: string; value: number }[] = [];

  // Initialize map to avoid undefined
  const dayHourMap = new Map<string, Map<string, number>>();

  for (const task of tasks) {
    const date = new Date(task.createdAt);
    const day = days[date.getDay()];
    const hour24 = date.getHours();

    if (allowedHours.includes(hour24)) {
      const hourLabel =
        hour24 < 12 ? `${hour24}AM` : `${hour24 === 12 ? 12 : hour24 - 12}PM`;

      if (!dayHourMap.has(day)) {
        dayHourMap.set(day, new Map<string, number>());
      }

      const hourMap = dayHourMap.get(day)!;
      hourMap.set(hourLabel, (hourMap.get(hourLabel) || 0) + 1);
    }
  }

  // Flatten into array
  for (const [day, hourMap] of dayHourMap.entries()) {
    for (const [hour, count] of hourMap.entries()) {
      heatmapData.push({ day, hour, value: count });
    }
  }

  return NextResponse.json({ data: heatmapData });
}
