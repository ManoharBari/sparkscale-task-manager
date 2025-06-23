import { DashboardHeader } from "@/src/components/dashboard-header";
import { DashboardShell } from "@/src/components/dashboard-shell";
import { CompletionTrends } from "@/src/components/analytics/completion-trends";
import { UserProductivity } from "@/src/components/analytics/user-productivity";
import { ProjectSuccessRate } from "@/src/components/analytics/project-success-rate";
import { TaskDistributionHeatmap } from "@/src/components/analytics/task-distribution-heatmap";
import { PerformanceMetrics } from "@/src/components/analytics/performance-metrics";
import { getServerSession } from "next-auth";
import { authConfig } from "../../api/auth/[...nextauth]/config";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.isAdmin) {
    redirect("/");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Analytics"
        text="Detailed metrics and performance analytics."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <CompletionTrends />
        <UserProductivity />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ProjectSuccessRate />
        <PerformanceMetrics />
        <TaskDistributionHeatmap />
      </div>
    </DashboardShell>
  );
}
