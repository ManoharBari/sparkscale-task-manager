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
  NEW: "#3b82f6",
  ONGOING: "#8b5cf6",
  ON_TRACK: "#22c55e",
  DELAYED: "#f59e0b",
  COMPLETED: "#10b981",
};

type TaskStatus = {
  name: string;
  count: number;
};

export function TaskStatusChart() {
  const [data, setData] = useState<TaskStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get("/api/admin/task-status");
        setData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch task status", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const maxValue = Math.max(...data.map((item) => item.count), 1); // avoid division by 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Status</CardTitle>
        <CardDescription>Distribution of tasks by status</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : (
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>{item.count}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(item.count / maxValue) * 100}%`,
                      backgroundColor: STATUS_COLORS[item.name] || "#ccc",
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
