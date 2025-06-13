"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { formatDistanceToNow, isPast } from "date-fns"
import Link from "next/link"

export function UpcomingDeadlines() {
  // In a real app, this data would come from your database
  const deadlines = [
    {
      id: "task-1",
      name: "Update user documentation",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
      project: {
        id: "project-1",
        name: "Website Redesign",
      },
    },
    {
      id: "task-2",
      name: "Fix login page bug",
      dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago (overdue)
      project: {
        id: "project-2",
        name: "Mobile App Development",
      },
    },
    {
      id: "task-3",
      name: "Create API documentation",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
      project: {
        id: "project-3",
        name: "Database Migration",
      },
    },
    {
      id: "task-4",
      name: "Review pull request",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
      project: {
        id: "project-2",
        name: "Mobile App Development",
      },
    },
  ]

  // Sort by due date (ascending)
  const sortedDeadlines = [...deadlines].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
        <CardDescription>Tasks due soon or overdue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedDeadlines.map((task) => {
            const isOverdue = isPast(task.dueDate)
            const dueIn = formatDistanceToNow(task.dueDate, { addSuffix: true })

            return (
              <div key={task.id} className="flex flex-col space-y-1 border-b pb-3 last:border-0">
                <div className="flex justify-between items-center">
                  <Link href={`/user-dashboard/tasks/${task.id}`} className="text-sm font-medium hover:underline">
                    {task.name}
                  </Link>
                  {isOverdue ? (
                    <Badge variant="destructive">Overdue</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-amber-100 text-amber-800">
                      Due Soon
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  <span>{task.project.name}</span>
                  <span className="mx-1">•</span>
                  <span className={isOverdue ? "text-red-500 font-medium" : ""}>{dueIn}</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
