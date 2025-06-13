"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import axios from "axios";

type AssigneeData = {
  name: string;
  tasks: number;
  avatar: string;
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

export function TasksByAssignee() {
  const [data, setData] = useState<AssigneeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssigneeData = async () => {
      try {
        const res = await axios.get("/api/task/by-assignee");
        const enriched = res.data.map((item: AssigneeData, index: number) => ({
          ...item,
          fill: defaultColors[index % defaultColors.length],
        }));
        setData(enriched);
      } catch (err) {
        console.error("Failed to fetch assignee tasks", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssigneeData();
  }, []);

  const maxValue = Math.max(...data.map((item) => item.tasks), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks by Assignee</CardTitle>
        <CardDescription>Distribution of tasks per user</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={item.avatar} alt={item.name} />
                  <AvatarFallback>
                    {item.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.name}</span>
                    <span>{item.tasks} tasks</span>
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
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
