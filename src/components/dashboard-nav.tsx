"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, FolderKanban, CheckSquare, Settings, Home } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/src/components/ui/sidebar"

export function DashboardNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      icon: Home,
      title: "Dashboard",
    },
    {
      href: "/users",
      icon: Users,
      title: "Users",
    },
    {
      href: "/projects",
      icon: FolderKanban,
      title: "Projects",
    },
    {
      href: "/tasks",
      icon: CheckSquare,
      title: "Tasks",
    },
    {
      href: "/analytics",
      icon: BarChart3,
      title: "Analytics",
    },
    {
      href: "/settings",
      icon: Settings,
      title: "Settings",
    },
  ]

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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
