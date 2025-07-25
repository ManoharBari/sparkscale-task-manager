"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  User,
  BarChart3,
  Settings,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/src/components/ui/sidebar";

export function AdminDashboardNav() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/admin",
      icon: LayoutDashboard,
      title: "Dashboard",
    },
    {
      href: "/admin/users",
      icon: User,
      title: "Users",
    },
    {
      href: "/admin/projects",
      icon: FolderKanban,
      title: "My Projects",
    },
    {
      href: "/admin/tasks",
      icon: CheckSquare,
      title: "My Tasks",
    },
    {
      href: "/admin/analytics",
      icon: BarChart3,
      title: "Analytics",
    },
    {
      href: "/admin/settings",
      icon: Settings,
      title: "Settings",
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Task Manager</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild isActive={pathname === route.href}>
                <Link href={route.href}>
                  <route.icon className="h-4 w-4" />
                  <span>{route.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
