"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

export function TaskCompletionRate() {
  const [data, setData] = useState([
    { name: "Completed", value: 0, color: "#22c55e" },
    { name: "In Progress", value: 0, color: "#3b82f6" },
    { name: "Delayed", value: 0, color: "#f59e0b" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("/api/task/summary");
        const { completed, inProgress, delayed } = res.data;

        setData([
          { name: "Completed", value: completed, color: "#22c55e" },
          { name: "In Progress", value: inProgress, color: "#3b82f6" },
          { name: "Delayed", value: delayed, color: "#f59e0b" },
        ]);
      } catch (err) {
        console.error("Error loading task summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const totalTasks = data.reduce((sum, item) => sum + item.value, 0);
  const completionRate =
    totalTasks === 0 ? 0 : Math.round((data[0].value / totalTasks) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Completion</CardTitle>
        <CardDescription>
          Overall task completion rate: {completionRate}%
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col items-center">
            {/* Progress Circle */}
            <div className="relative w-40 h-40 mb-6">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="transparent"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="transparent"
                  stroke="#22c55e"
                  strokeWidth="10"
                  strokeDasharray={`${completionRate * 2.83} ${
                    (100 - completionRate) * 2.83
                  }`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="20"
                  fontWeight="bold"
                  fill="currentColor"
                >
                  {completionRate}%
                </text>
              </svg>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-1 gap-2 w-full">
              {data.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {item.value} (
                    {totalTasks === 0
                      ? 0
                      : Math.round((item.value / totalTasks) * 100)}
                    %)
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
