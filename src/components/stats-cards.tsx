"use client"

import { cn } from "@/src/lib/utils"

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Users, FolderKanban, CheckSquare, AlertTriangle } from "lucide-react"

export function StatsCards() {
  // In a real app, this data would come from your database
  const stats = [
    {
      title: "Total Users",
      value: "24",
      icon: Users,
      description: "3 new this month",
    },
    {
      title: "Active Projects",
      value: "12",
      icon: FolderKanban,
      description: "4 due this week",
    },
    {
      title: "Total Tasks",
      value: "78",
      icon: CheckSquare,
      description: "23 completed this week",
    },
    {
      title: "Delayed Tasks",
      value: "5",
      icon: AlertTriangle,
      description: "Requires attention",
      className: "text-amber-500",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={cn("h-4 w-4 text-muted-foreground", stat.className)} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
