"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"

type UserProductivityData = {
  name: string
  completed: number
  inProgress: number
  avatar?: string
}

export function UserProductivity() {
  const [data, setData] = useState<UserProductivityData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/user-productivity")
        if (!res.ok) throw new Error("Failed to fetch data")
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError("Error fetching data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const maxValue =
    Math.max(...data.flatMap((item) => [item.completed + item.inProgress]), 1)

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>User Productivity</CardTitle>
        <CardDescription>Tasks completed vs in progress by user</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
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
                      <AvatarImage
                        src={item.avatar || "/placeholder.svg"}
                        alt={item.name}
                      />
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
        )}
      </CardContent>
    </Card>
  )
}
