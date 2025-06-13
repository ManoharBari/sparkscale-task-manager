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

type ProjectTaskData = {
  name: string;
  tasks: number;
};

const defaultColors = [
  "#3b82f6",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
  "#10b981",
  "#ec4899",
  "#0ea5e9",
];

export function TasksByProject() {
  const [data, setData] = useState<ProjectTaskData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/api/task/by-project");
        const enriched = res.data.map(
          (item: ProjectTaskData, index: number) => ({
            ...item,
            fill: defaultColors[index % defaultColors.length],
          })
        );
        setData(enriched);
      } catch (err) {
        console.error("Failed to load tasks by project:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const maxValue = Math.max(...data.map((item) => item.tasks), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks by Project</CardTitle>
        <CardDescription>Distribution of tasks across projects</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="truncate">{item.name}</span>
                  <span>{item.tasks}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(item.tasks / maxValue) * 100}%`,
                      backgroundColor: item.fill,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
