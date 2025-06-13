import { DashboardHeader } from "@/src/components/dashboard-header"
import { DashboardShell } from "@/src/components/dashboard-shell"
import { UsersList } from "@/src/components/users/users-list"
import { UserActivityChart } from "@/src/components/users/user-activity-chart"
import { UserTypeDistribution } from "@/src/components/users/user-type-distribution"
import { RecentlyJoinedUsers } from "@/src/components/users/recently-joined-users"

export default async function UsersPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Users" text="Manage and monitor user accounts." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <UserActivityChart />
        <UserTypeDistribution />
        <RecentlyJoinedUsers />
      </div>
      <div className="grid gap-4">
        <UsersList />
      </div>
    </DashboardShell>
  )
}
