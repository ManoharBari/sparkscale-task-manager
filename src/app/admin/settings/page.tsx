import { DashboardHeader } from "@/src/components/dashboard-header";
import { DashboardShell } from "@/src/components/dashboard-shell";
import { GeneralSettings } from "@/src/components/settings/general-settings";
import { NotificationSettings } from "@/src/components/settings/notification-settings";
import { SecuritySettings } from "@/src/components/settings/security-settings";
import { getServerSession } from "next-auth";
import { authConfig } from "../../api/auth/[...nextauth]/config";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.isAdmin) {
    redirect("/");
  }
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage your system preferences."
      />
      <div className="grid gap-4">
        <SecuritySettings />
      </div>
    </DashboardShell>
  );
}
