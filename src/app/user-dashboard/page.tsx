import { UserDashboardHeader } from "@/src/components/user-dashboard/dashboard-header"
import { DashboardShell } from "@/src/components/dashboard-shell"
import { UserStats } from "@/src/components/user-dashboard/user-stats"
import { UserTasksOverview } from "@/src/components/user-dashboard/user-tasks-overview"
import { UserProjectsOverview } from "@/src/components/user-dashboard/user-projects-overview"
import { RecentActivity } from "@/src/components/user-dashboard/recent-activity"
import { UpcomingDeadlines } from "@/src/components/user-dashboard/upcoming-deadlines"

export default async function UserDashboardPage() {
  // In a real app, you would fetch the current user's data
  // const session = await getSession()
  // if (!session) redirect("/login")
  // const userId = session.user.id

  return (
    <DashboardShell>
      <UserDashboardHeader heading="My Dashboard" text="Welcome back! Here's an overview of your projects and tasks." />
      <div className="grid gap-4 md:grid-cols-3">
        <UserStats />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <UserTasksOverview />
        <UserProjectsOverview />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <RecentActivity />
        <UpcomingDeadlines />
      </div>
    </DashboardShell>
  )
}
