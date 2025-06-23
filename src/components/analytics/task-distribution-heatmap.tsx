"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

type HeatmapData = {
  day: string;
  hour: string;
  value: number;
};

export function TaskDistributionHeatmap() {
  const [data, setData] = useState<HeatmapData[]>([]);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = ["9AM", "11AM", "1PM", "3PM", "5PM"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/task-heatmap");
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        console.error("Failed to load heatmap data:", err);
      }
    };

    fetchData();
  }, []);

  const getBackgroundColor = (value: number) => {
    const intensity = Math.min(value / 10, 1);
    return `rgba(59, 130, 246, ${intensity})`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Activity Heatmap</CardTitle>
        <CardDescription>
          Task activity distribution by day and time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 gap-1">
          <div className="col-start-2 col-span-5 grid grid-cols-5 gap-1">
            {hours.map((hour, i) => (
              <div key={i} className="text-center text-xs font-medium">
                {hour}
              </div>
            ))}
          </div>
          {days.map((day, dayIndex) => (
            <React.Fragment key={dayIndex}>
              <div className="flex items-center justify-end pr-2 text-xs font-medium">
                {day}
              </div>
              {hours.map((hour, hourIndex) => {
                const cellData = data.find(
                  (d) => d.day === day && d.hour === hour
                );
                return (
                  <div
                    key={`${dayIndex}-${hourIndex}`}
                    className="aspect-square rounded-sm flex items-center justify-center text-xs font-medium text-white"
                    style={{
                      backgroundColor: getBackgroundColor(cellData?.value || 0),
                    }}
                  >
                    {cellData?.value ?? "-"}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
