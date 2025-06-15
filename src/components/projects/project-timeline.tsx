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
import axios from "axios";

type Project = {
  id: string;
  name: string;
  startDate: string;
  dueDate: string;
  status: string;
  color: string;
};

export function ProjectTimeline() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("/api/projects");
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch project data");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading project timeline...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const parsedProjects = projects.map((p) => ({
    ...p,
    startDate: new Date(p.startDate),
    dueDate: new Date(p.dueDate),
  }));

  const sortedProjects = [...parsedProjects].sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );

  const earliestDate = new Date(
    Math.min(...parsedProjects.map((p) => p.startDate.getTime()))
  );
  const latestDate = new Date(
    Math.max(...parsedProjects.map((p) => p.dueDate.getTime()))
  );

  const timelineStart = new Date(earliestDate);
  timelineStart.setMonth(timelineStart.getMonth() - 1);

  const timelineEnd = new Date(latestDate);
  timelineEnd.setMonth(timelineEnd.getMonth() + 1);

  const timelineDuration = timelineEnd.getTime() - timelineStart.getTime();

  const months = [];
  const currentDate = new Date(timelineStart);
  while (currentDate <= timelineEnd) {
    months.push(new Date(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  const today = new Date();
  const todayOffset =
    ((today.getTime() - timelineStart.getTime()) / timelineDuration) * 100;

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
        <CardTitle>Project Timeline</CardTitle>
        <CardDescription>Visual timeline of all projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Month labels */}
          <div className="flex border-b mb-4">
            {months.map((month, index) => (
              <div key={index} className="flex-1 text-xs text-center pb-2">
                {month.toLocaleDateString(undefined, {
                  month: "short",
                  year: "2-digit",
                })}
              </div>
            ))}
          </div>

          {/* Today line */}
          <div
            className="absolute top-6 bottom-0 w-[2px] bg-red-500 z-10"
            style={{ left: `${todayOffset}%` }}
          >
            <div className="absolute -top-6 -translate-x-1/2 text-xs font-medium text-red-500 whitespace-nowrap">
              Today
            </div>
          </div>

          {/* Project bars */}
          <div className="space-y-6">
            {sortedProjects.map((project) => {
              const startOffset =
                ((project.startDate.getTime() - timelineStart.getTime()) /
                  timelineDuration) *
                100;
              const duration =
                ((project.dueDate.getTime() - project.startDate.getTime()) /
                  timelineDuration) *
                100;

              return (
                <div key={project.id} className="relative">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{project.name}</span>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="h-8 bg-gray-100 rounded-md">
                    <div
                      className="h-6 p-4 rounded-md flex items-center justify-center text-xs text-white font-medium"
                      style={{
                        width: `${duration}%`,
                        marginLeft: `${startOffset}%`,
                        backgroundColor: "#4F46E5",
                      }}
                    >
                      {project.startDate
                        .toLocaleDateString()
                        .split("/")
                        .slice(0, 2)
                        .join("/")}{" "}
                      -
                      {project.dueDate
                        .toLocaleDateString()
                        .split("/")
                        .slice(0, 2)
                        .join("/")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
