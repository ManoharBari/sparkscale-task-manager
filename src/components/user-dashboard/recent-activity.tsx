"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Badge } from "@/src/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

export function RecentActivity() {
  // In a real app, this data would come from your database
  const activities = [
    {
      id: "activity-1",
      type: "TASK_COMPLETED",
      description: "You completed task 'Create wireframes'",
      project: "Website Redesign",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "activity-2",
      type: "TASK_ASSIGNED",
      description: "Sarah assigned you task 'Review API documentation'",
      project: "Mobile App Development",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      user: {
        name: "Sarah Smith",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "activity-3",
      type: "REMARK_ADDED",
      description: "Mike added a remark on 'Database schema design'",
      project: "Database Migration",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      user: {
        name: "Mike Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "activity-4",
      type: "STATUS_CHANGED",
      description: "You changed status of 'User authentication' to 'In Progress'",
      project: "Mobile App Development",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "TASK_COMPLETED":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "TASK_ASSIGNED":
        return <Badge className="bg-blue-100 text-blue-800">Assigned</Badge>
      case "REMARK_ADDED":
        return <Badge className="bg-purple-100 text-purple-800">Comment</Badge>
      case "STATUS_CHANGED":
        return <Badge className="bg-amber-100 text-amber-800">Updated</Badge>
      default:
        return <Badge>Activity</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates from your projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.description}</p>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{activity.project}</span>
                  <span className="mx-1">•</span>
                  <span>{formatDistanceToNow(activity.timestamp, { addSuffix: true })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
