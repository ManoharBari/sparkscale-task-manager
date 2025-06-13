"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FolderKanban, CheckSquare, User } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/src/components/ui/sidebar"

export function UserDashboardNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/user-dashboard",
      icon: LayoutDashboard,
      title: "Dashboard",
    },
    {
      href: "/user-dashboard/projects",
      icon: FolderKanban,
      title: "My Projects",
    },
    {
      href: "/user-dashboard/tasks",
      icon: CheckSquare,
      title: "My Tasks",
    },
    {
      href: "/user-dashboard/profile",
      icon: User,
      title: "Profile",
    },
  ]

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Ta</SidebarGroupLabel>
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
  )
}
