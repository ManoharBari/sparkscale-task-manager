"use client";

import type React from "react";
import { UserDashboardNav } from "@/src/components/user-dashboard-nav";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
} from "@/src/components/ui/sidebar";
import { AdminDashboardNav } from "./admin-dashboard-nav";
import { useSession } from "next-auth/react";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.isAdmin ?? false;
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen flex-col">
        <div className="flex flex-1">
          <Sidebar>
            <SidebarContent>
              {isAdmin ? <AdminDashboardNav /> : <UserDashboardNav />}
            </SidebarContent>
          </Sidebar>
          <main className="flex-1 p-6 lg:p-8">
            <div className="mx-auto space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
