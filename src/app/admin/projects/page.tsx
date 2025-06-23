import { DashboardHeader } from "@/src/components/dashboard-header";
import { DashboardShell } from "@/src/components/dashboard-shell";
import { ProjectsList } from "@/src/components/projects/projects-list";
import { ProjectTimeline } from "@/src/components/projects/project-timeline";
import { ProjectTypeDistribution } from "@/src/components/projects/project-type-distribution";
import { ProjectDeadlines } from "@/src/components/projects/project-deadlines";
import { getServerSession } from "next-auth";
import { authConfig } from "../../api/auth/[...nextauth]/config";
import { redirect } from "next/navigation";

export default async function ProjectsPage() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.isAdmin) {
    redirect("/");
  }
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Projects"
        text="Manage and monitor all projects."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ProjectTypeDistribution />
        <ProjectDeadlines />
      </div>
      <div className="grid gap-4">
        <ProjectTimeline />
        <ProjectsList />
      </div>
    </DashboardShell>
  );
}
