"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"

export function TaskStatusChart() {
  // In a real app, this data would come from your database
  const data = [
    { name: "NEW", count: 12, fill: "#3b82f6" },
    { name: "ONGOING", count: 18, fill: "#8b5cf6" },
    { name: "ON_TRACK", count: 15, fill: "#22c55e" },
    { name: "DELAYED", count: 5, fill: "#f59e0b" },
    { name: "COMPLETED", count: 28, fill: "#10b981" },
  ]

  const maxValue = Math.max(...data.map((item) => item.count))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Status</CardTitle>
        <CardDescription>Distribution of tasks by status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span>{item.count}</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(item.count / maxValue) * 100}%`,
                    backgroundColor: item.fill,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
