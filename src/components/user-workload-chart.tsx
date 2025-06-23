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

type WorkloadData = {
  name: string;
  tasks: number;
};

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
  "#10b981",
  "#ef4444",
];

export function UserWorkloadChart() {
  const [data, setData] = useState<WorkloadData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/admin/user-workload");
        setData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch workload data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const maxValue = Math.max(...data.map((item) => item.tasks), 1); // Avoid divide by 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Workload</CardTitle>
        <CardDescription>Number of active tasks per user</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : (
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className="w-16 text-sm truncate">{item.name}</div>
                <div className="flex-1 h-6 bg-gray-100 rounded-md overflow-hidden">
                  <div
                    className="h-full flex items-center justify-end px-2 text-xs text-white font-medium"
                    style={{
                      width: `${(item.tasks / maxValue) * 100}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  >
                    {item.tasks}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
