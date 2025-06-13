import { DashboardHeader } from "@/src/components/dashboard-header"
import { DashboardShell } from "@/src/components/dashboard-shell"
import { GeneralSettings } from "@/src/components/settings/general-settings"
import { NotificationSettings } from "@/src/components/settings/notification-settings"
import { SecuritySettings } from "@/src/components/settings/security-settings"

export default async function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your system preferences." />
      <div className="grid gap-4">
        <GeneralSettings />
        <NotificationSettings />
        <SecuritySettings />
      </div>
    </DashboardShell>
  )
}
