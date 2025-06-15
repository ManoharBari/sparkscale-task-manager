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

interface Project {
  id: string;
  name: string;
  dueDate: string;
  status: string;
  daysLeft: number;
}

export function ProjectDeadlines() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("/api/projects");

        const now = new Date();

        const enriched = data.map((project: any) => {
          const dueDate = new Date(project.dueDate);
          const daysLeft = Math.ceil(
            (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
          );
          return {
            ...project,
            daysLeft,
          };
        });

        // Sort by daysLeft ascending
        enriched.sort((a: Project, b: Project) => a.daysLeft - b.daysLeft);

        setProjects(enriched);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading deadlines...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
        <CardDescription>Projects due soon or overdue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col space-y-1 border-b pb-3 last:border-0"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{project.name}</span>
                {project.daysLeft < 0 ? (
                  <Badge variant="destructive">Overdue</Badge>
                ) : project.daysLeft < 7 ? (
                  <Badge
                    variant="outline"
                    className="bg-amber-100 text-amber-800"
                  >
                    Due Soon
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800"
                  >
                    Upcoming
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Due: {new Date(project.dueDate).toLocaleDateString()}
                {project.daysLeft < 0
                  ? ` (${Math.abs(project.daysLeft)} days overdue)`
                  : ` (${project.daysLeft} days left)`}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
