"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Badge } from "@/src/components/ui/badge"

interface ProjectMembersProps {
  projectId: string
}

export function ProjectMembers({ projectId }: ProjectMembersProps) {
  // In a real app, this data would come from your database
  const members = [
    {
      id: "user-1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Developer",
      isCurrentUser: true,
      tasksCount: 5,
    },
    {
      id: "user-2",
      name: "Sarah Smith",
      email: "sarah@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Designer",
      isCurrentUser: false,
      tasksCount: 3,
    },
    {
      id: "user-3",
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Developer",
      isCurrentUser: false,
      tasksCount: 4,
    },
    {
      id: "user-4",
      name: "Emily Chen",
      email: "emily@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Project Manager",
      isCurrentUser: false,
      tasksCount: 2,
    },
    {
      id: "user-5",
      name: "David Wilson",
      email: "david@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Tester",
      isCurrentUser: false,
      tasksCount: 3,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>People working on this project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium">{member.name}</span>
                    {member.isCurrentUser && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        You
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">{member.role}</div>
                </div>
              </div>
              <Badge variant="outline">{member.tasksCount} tasks</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
