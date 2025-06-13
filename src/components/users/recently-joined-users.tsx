"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"

export function RecentlyJoinedUsers() {
  // In a real app, this data would come from your database
  const recentUsers = [
    {
      id: "user-5",
      name: "David Wilson",
      email: "david@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      joinedDate: "2023-04-12",
    },
    {
      id: "user-6",
      name: "Lisa Brown",
      email: "lisa@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      joinedDate: "2023-04-10",
    },
    {
      id: "user-7",
      name: "Robert Taylor",
      email: "robert@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      joinedDate: "2023-04-05",
    },
    {
      id: "user-8",
      name: "Jennifer Lee",
      email: "jennifer@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      joinedDate: "2023-04-01",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recently Joined</CardTitle>
        <CardDescription>New users this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentUsers.map((user) => (
            <div key={user.id} className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">Joined {new Date(user.joinedDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
