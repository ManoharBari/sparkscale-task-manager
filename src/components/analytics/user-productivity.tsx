"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"

export function UserProductivity() {
  // In a real app, this data would come from your database
  const data = [
    { name: "John", completed: 10, inProgress: 2, avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Sarah", completed: 7, inProgress: 1, avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Mike", completed: 12, inProgress: 3, avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Emily", completed: 15, inProgress: 5, avatar: "/placeholder.svg?height=32&width=32" },
    { name: "David", completed: 5, inProgress: 1, avatar: "/placeholder.svg?height=32&width=32" },
  ]

  const maxValue = Math.max(...data.flatMap((item) => [item.completed + item.inProgress]))

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>User Productivity</CardTitle>
        <CardDescription>Tasks completed vs in progress by user</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm">In Progress</span>
            </div>
          </div>

          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={item.avatar || "/placeholder.svg"} alt={item.name} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="h-6 w-full bg-gray-100 rounded-md overflow-hidden flex">
                  <div
                    className="h-full flex items-center justify-center text-xs text-white font-medium"
                    style={{
                      width: `${(item.completed / maxValue) * 100}%`,
                      backgroundColor: "#22c55e",
                    }}
                  >
                    {item.completed}
                  </div>
                  <div
                    className="h-full flex items-center justify-center text-xs text-white font-medium"
                    style={{
                      width: `${(item.inProgress / maxValue) * 100}%`,
                      backgroundColor: "#3b82f6",
                    }}
                  >
                    {item.inProgress}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
