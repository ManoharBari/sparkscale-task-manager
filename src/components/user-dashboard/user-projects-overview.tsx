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
import Link from "next/link";
import axios from "axios";

type Project = {
  id: string;
  name: string;
  status: string;
  color: string;
};

type Task = {
  id: string;
  projectId: string | null;
  user_id: string;
  status: string;
};

export function UserProjectsOverview() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/api/projects/overview");

        setProjects(data.projects || []);
        setTasks(data.tasks || []);
      } catch (err) {
        console.error("Network error", err);
      }
    }

    fetchData();
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

  const getTaskStats = (projectId: string) => {
    const filtered = tasks.filter((task) => task.projectId === projectId);
    const completed = filtered.filter(
      (task) => task.status == "COMPLETED"
    ).length;
    return { completed, total: filtered.length };
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Projects</CardTitle>
        <CardDescription>Your active projects and progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => {
            const { completed, total } = getTaskStats(project.id);

            return (
              <div key={project.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Link
                    href={`/user-dashboard/projects/${project.id}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {project.name}
                  </Link>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>
                      {completed}/{total} tasks
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${total ? (completed / total) * 100 : 0}%`,
                        backgroundColor: "#397bff",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
