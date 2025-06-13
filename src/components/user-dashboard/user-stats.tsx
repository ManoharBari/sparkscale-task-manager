"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { CheckSquare, Clock, AlertTriangle } from "lucide-react"
import { cn } from "@/src/lib/utils"

export function UserStats() {
  // In a real app, this data would come from your database
  const stats = [
    {
      title: "Assigned Tasks",
      value: "12",
      icon: CheckSquare,
      description: "Across 4 projects",
    },
    {
      title: "Due This Week",
      value: "5",
      icon: Clock,
      description: "Tasks due soon",
    },
    {
      title: "Overdue Tasks",
      value: "2",
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
