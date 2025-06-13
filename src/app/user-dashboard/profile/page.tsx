import { UserDashboardHeader } from "@/src/components/user-dashboard/dashboard-header"
import { DashboardShell } from "@/src/components/dashboard-shell"
import { UserProfileInfo } from "@/src/components/user-dashboard/profile/user-profile-info"
import { UserPasswordChange } from "@/src/components/user-dashboard/profile/user-password-change"
import { UserWeekOffSettings } from "@/src/components/user-dashboard/profile/user-week-off-settings"
import { UserAccountStats } from "@/src/components/user-dashboard/profile/user-account-stats"
import { UserProjectsOverview } from "@/src/components/user-dashboard/profile/user-projects-overview"

export default async function UserProfilePage() {
  // In a real app, you would fetch the current user's data
  // const session = await getSession()
  // if (!session) redirect("/login")
  // const userId = session.user.id
  // const user = await getUserById(userId)

  // Mock user data based on the schema
  const user = {
    id: "user-1",
    email: "john.doe@example.com",
    isAdmin: false,
    createdAt: "2022-05-15T10:30:00Z",
    weekOff: ["Saturday", "Sunday"],
    deleted: false,
    joiningDate: "2022-05-15T10:30:00Z",
    resignationDate: null,
    tasksCount: 12,
    projectsOwnedCount: 3,
  }

  return (
    <DashboardShell>
      <UserDashboardHeader heading="My Profile" text="View and manage your account information." />
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <UserProfileInfo user={user} />
          <UserAccountStats user={user} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <UserPasswordChange />
          <UserWeekOffSettings user={user} />
        </div>
        <UserProjectsOverview userId={user.id} />
      </div>
    </DashboardShell>
  )
}
