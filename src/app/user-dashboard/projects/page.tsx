import { UserDashboardHeader } from "@/src/components/user-dashboard/dashboard-header"
import { DashboardShell } from "@/src/components/dashboard-shell"
import { UserProjectsList } from "@/src/components/user-dashboard/projects/user-projects-list"

export default async function UserProjectsPage() {
  return (
    <DashboardShell>
      <UserDashboardHeader heading="My Projects" text="View and manage your assigned projects." />
      <div className="grid gap-4">
        <UserProjectsList />
      </div>
    </DashboardShell>
  )
}
