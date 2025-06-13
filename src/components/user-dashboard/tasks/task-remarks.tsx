"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/src/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { Textarea } from "@/src/components/ui/textarea"
import { formatDistanceToNow } from "date-fns"

interface TaskRemarksProps {
  taskId: string
}

export function TaskRemarks({ taskId }: TaskRemarksProps) {
  const [newRemark, setNewRemark] = useState("")

  // In a real app, this data would come from your database
  const remarks = [
    {
      id: "remark-1",
      content: "I've started working on this task. Will update the documentation based on the new features.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      user: {
        id: "user-1",
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        isCurrentUser: true,
      },
    },
    {
      id: "remark-2",
      content: "Please make sure to include the API authentication section in the documentation.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      user: {
        id: "user-4",
        name: "Emily Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        isCurrentUser: false,
      },
    },
    {
      id: "remark-3",
      content: "I've added the authentication section. Working on the endpoint documentation now.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      user: {
        id: "user-1",
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        isCurrentUser: true,
      },
    },
  ]

  const handleAddRemark = () => {
    if (!newRemark.trim()) return

    // In a real app, you would send this to your API
    console.log("Adding remark:", newRemark)

    // Clear the input
    setNewRemark("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Remarks</CardTitle>
        <CardDescription>Comments and updates about this task</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {remarks.map((remark) => (
            <div key={remark.id} className={`flex gap-3 ${remark.user.isCurrentUser ? "justify-end" : ""}`}>
              {!remark.user.isCurrentUser && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={remark.user.avatar || "/placeholder.svg"} alt={remark.user.name} />
                  <AvatarFallback>{remark.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  remark.user.isCurrentUser ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-medium">{remark.user.isCurrentUser ? "You" : remark.user.name}</span>
                  <span className="text-xs opacity-70">
                    {formatDistanceToNow(remark.createdAt, { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm">{remark.content}</p>
              </div>
              {remark.user.isCurrentUser && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={remark.user.avatar || "/placeholder.svg"} alt={remark.user.name} />
                  <AvatarFallback>{remark.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center space-x-2">
          <Textarea
            placeholder="Add a remark..."
            value={newRemark}
            onChange={(e) => setNewRemark(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleAddRemark}>Send</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
