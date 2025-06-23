"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { cn } from "@/src/lib/utils";
import axios from "axios";

type Task = {
  id: string;
  name: string;
  status: string;
  dueDate: string;
  assignedToId: {
    name: string;
    email: string;
    avatar: string;
  };
  projectId: string;
};

export function RecentTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/api/admin/recent-tasks");
        setTasks(res.data.data);
      } catch (error) {
        console.error("Failed to fetch recent tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-800";
      case "ONGOING":
        return "bg-purple-100 text-purple-800";
      case "ON_TRACK":
        return "bg-green-100 text-green-800";
      case "DELAYED":
        return "bg-amber-100 text-amber-800";
      case "ON_HOLD":
        return "bg-gray-100 text-gray-800";
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
        <CardDescription>Latest tasks across all projects</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start space-x-4 rounded-md border p-3"
              >
                <Avatar>
                  <AvatarFallback>
                    {task.assignedToId.email.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{task.name}</p>
                    <Badge className={cn(getStatusColor(task.status))}>
                      {task.status}
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{task.projectId}</span>
                    <span className="mx-1">•</span>
                    <span>
                      Due {new Date(task.dueDate).toLocaleDateString()}
                    </span>
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
