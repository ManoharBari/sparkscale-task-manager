import { DashboardHeader } from "@/src/components/dashboard-header";
import { DashboardShell } from "@/src/components/dashboard-shell";
import { Overview } from "@/src/components/overview";
import { RecentTasks } from "@/src/components/recent-tasks";
import { StatsCards } from "@/src/components/stats-cards";
import { ProjectStatusChart } from "@/src/components/project-status-chart";
import { TaskStatusChart } from "@/src/components/task-status-chart";
import { UserWorkloadChart } from "@/src/components/user-workload-chart";
import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/[...nextauth]/config";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.isAdmin) {
    redirect("/"); 
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Overview of your project management system."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCards />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ProjectStatusChart />
        <TaskStatusChart />
        <UserWorkloadChart />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Overview />
        <RecentTasks />
      </div>
    </DashboardShell>
  );
}
