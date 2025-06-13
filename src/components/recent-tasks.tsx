"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { cn } from "@/src/lib/utils"

export function RecentTasks() {
  // In a real app, this data would come from your database
  const tasks = [
    {
      id: "task-1",
      name: "Update user documentation",
      status: "ONGOING",
      dueDate: "2023-05-10",
      assignedTo: {
        name: "John Doe",
        email: "john@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      project: "Website Redesign",
    },
    {
      id: "task-2",
      name: "Fix login page bug",
      status: "DELAYED",
      dueDate: "2023-05-05",
      assignedTo: {
        name: "Sarah Smith",
        email: "sarah@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      project: "Mobile App",
    },
    {
      id: "task-3",
      name: "Create API documentation",
      status: "ON_TRACK",
      dueDate: "2023-05-15",
      assignedTo: {
        name: "Mike Johnson",
        email: "mike@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      project: "Backend Services",
    },
    {
      id: "task-4",
      name: "Design new dashboard",
      status: "NEW",
      dueDate: "2023-05-20",
      assignedTo: {
        name: "Emily Chen",
        email: "emily@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      project: "Analytics Platform",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-800"
      case "ONGOING":
        return "bg-purple-100 text-purple-800"
      case "ON_TRACK":
        return "bg-green-100 text-green-800"
      case "DELAYED":
        return "bg-amber-100 text-amber-800"
      case "ON_HOLD":
        return "bg-gray-100 text-gray-800"
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
        <CardDescription>Latest tasks across all projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-start space-x-4 rounded-md border p-3">
              <Avatar>
                <AvatarImage src={task.assignedTo.avatar || "/placeholder.svg"} alt={task.assignedTo.name} />
                <AvatarFallback>{task.assignedTo.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{task.name}</p>
                  <Badge className={cn(getStatusColor(task.status))}>{task.status}</Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{task.project}</span>
                  <span className="mx-1">•</span>
                  <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
