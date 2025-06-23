"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Users, FolderKanban, CheckSquare, AlertTriangle } from "lucide-react";
import { cn } from "@/src/lib/utils";
import axios from "axios";

export function StatsCards() {
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("/api/admin/stats-overview");
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading stats...</p>;
  }

  if (!stats) {
    return <p className="text-sm text-red-500">Failed to load stats.</p>;
  }

  const cardData = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      description: `${stats.newUsersThisMonth} new this month`,
    },
    {
      title: "Active Projects",
      value: stats.activeProjects,
      icon: FolderKanban,
      description: `${stats.dueProjectsThisWeek} due this week`,
    },
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: CheckSquare,
      description: `${stats.completedTasksThisWeek} completed this week`,
    },
    {
      title: "Delayed Tasks",
      value: stats.delayedTasks,
      icon: AlertTriangle,
      description: `Requires attention`,
      className: "text-amber-500",
    },
  ];

  return (
    <>
      {cardData.map((stat, index) => (
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
