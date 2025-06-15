"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import { UserDashboardHeader } from "@/src/components/user-dashboard/dashboard-header";
import { DashboardShell } from "@/src/components/dashboard-shell";
import { ProjectDetails } from "@/src/components/user-dashboard/projects/project-details";
import { ProjectTasks } from "@/src/components/user-dashboard/projects/project-tasks";
import { ProjectMembers } from "@/src/components/user-dashboard/projects/project-members";
import { ProjectProgress } from "@/src/components/user-dashboard/projects/project-progress";

export default function ProjectPage() {
  const { projectId } = useParams() as { projectId: string };

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await axios.get(`/api/project/${projectId}`);
        setProject(data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError("Project not found");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, []);

  if (loading) {
    return <div className="p-4 text-muted-foreground">Loading project...</div>;
  }

  if (error || !project) {
    return <div className="p-4 text-destructive">Project not found.</div>;
  }
  console.log("Project data:", project);
  return (
    <DashboardShell>
      <UserDashboardHeader
        heading={project.name}
        text={project.description || ""}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <ProjectDetails project={project} />
        </div>
        <div>
          <ProjectProgress projectId={projectId} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <ProjectTasks projectId={projectId} />
        </div>
        <div>
          <ProjectMembers project={project} />
        </div>
      </div>
    </DashboardShell>
  );
}
