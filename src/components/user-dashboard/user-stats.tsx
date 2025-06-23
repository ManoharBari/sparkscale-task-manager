"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { CheckSquare, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/src/lib/utils";
import axios from "axios";

export function UserStats() {
  const [stats, setStats] = useState<null | {
    assignedTasks: number;
    dueThisWeek: number;
    overdueTasks: number;
    totalProjects: number;
  }>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/users/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Failed to fetch user stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <p className="text-sm text-muted-foreground">Loading stats...</p>;
  }

  const statCards = [
    {
      title: "Assigned Tasks",
      value: stats.assignedTasks,
      icon: CheckSquare,
      description: `Across ${stats.totalProjects} project${
        stats.totalProjects !== 1 ? "s" : ""
      }`,
    },
    {
      title: "Due This Week",
      value: stats.dueThisWeek,
      icon: Clock,
      description: "Tasks due soon",
    },
    {
      title: "Overdue Tasks",
      value: stats.overdueTasks,
      icon: AlertTriangle,
      description: "Requires attention",
      className: "text-amber-500",
    },
  ];

  return (
    <>
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon
              className={cn("h-4 w-4 text-muted-foreground", stat.className)}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
