"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import axios from "axios";

const STATUS_COLORS: Record<string, string> = {
  ONGOING: "#3b82f6",
  COMPLETED: "#22c55e",
  DELAYED: "#f59e0b",
  ON_HOLD: "#6b7280",
};

type StatusData = {
  name: string;
  value: number;
};

export function ProjectStatusChart() {
  const [data, setData] = useState<StatusData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get("/api/admin/project-status");
        setData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch project status", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const total = data.reduce((acc, item) => acc + item.value, 0);

  const buildConicGradient = () => {
    let angle = 0;
    const segments = data.map((item) => {
      const color = STATUS_COLORS[item.name] || "#ccc";
      const valueAngle = (item.value / total) * 360;
      const segment = `${color} ${angle}deg ${angle + valueAngle}deg`;
      angle += valueAngle;
      return segment;
    });

    return `conic-gradient(${segments.join(", ")})`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Status</CardTitle>
        <CardDescription>Distribution of projects by status</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : (
          <div className="flex flex-col items-center">
            {/* Donut chart with one div using full conic-gradient */}
            <div className="relative w-48 h-48 mb-6">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: buildConicGradient(),
                  clipPath: "circle(50%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-background w-24 h-24 rounded-full" />
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-4">
              {data.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: STATUS_COLORS[item.name] || "#ccc",
                    }}
                  ></div>
                  <span className="text-sm">
                    {item.name}: {item.value} (
                    {Math.round((item.value / total) * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
