import { DashboardHeader } from "@/src/components/dashboard-header";
import { DashboardShell } from "@/src/components/dashboard-shell";
import { TasksList } from "@/src/components/tasks/tasks-list";
import { TaskCompletionRate } from "@/src/components/tasks/task-completion-rate";
import { TasksByProject } from "@/src/components/tasks/tasks-by-project";
import { TasksByAssignee } from "@/src/components/tasks/tasks-by-assignee";
import { getServerSession } from "next-auth";
import { authConfig } from "../../api/auth/[...nextauth]/config";
import { redirect } from "next/navigation";

export default async function TasksPage() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.isAdmin) {
    redirect("/");
  }
  return (
    <DashboardShell>
      <DashboardHeader heading="Tasks" text="Manage and monitor all tasks." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TaskCompletionRate />
        <TasksByProject />
        <TasksByAssignee />
      </div>
      <div className="grid gap-4">
        <TasksList />
      </div>
    </DashboardShell>
  );
}
