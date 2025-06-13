import { UserDashboardHeader } from "@/src/components/user-dashboard/dashboard-header"
import { DashboardShell } from "@/src/components/dashboard-shell"
import { UserTasksList } from "@/src/components/user-dashboard/tasks/user-tasks-list"

export default async function UserTasksPage() {
  return (
    <DashboardShell>
      <UserDashboardHeader heading="My Tasks" text="View and manage all your assigned tasks across projects." />
      <div className="grid gap-4">
        <UserTasksList />
      </div>
    </DashboardShell>
  )
}
