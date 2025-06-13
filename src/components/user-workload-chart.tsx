"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"

export function UserWorkloadChart() {
  // In a real app, this data would come from your database
  const data = [
    { name: "John", tasks: 8, fill: "#3b82f6" },
    { name: "Sarah", tasks: 12, fill: "#8b5cf6" },
    { name: "Mike", tasks: 5, fill: "#22c55e" },
    { name: "Emily", tasks: 10, fill: "#f59e0b" },
    { name: "David", tasks: 7, fill: "#10b981" },
  ]

  const maxValue = Math.max(...data.map((item) => item.tasks))

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Workload</CardTitle>
        <CardDescription>Number of active tasks per user</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <div className="w-16 text-sm">{item.name}</div>
              <div className="flex-1 h-6 bg-gray-100 rounded-md overflow-hidden">
                <div
                  className="h-full flex items-center justify-end px-2 text-xs text-white font-medium"
                  style={{
                    width: `${(item.tasks / maxValue) * 100}%`,
                    backgroundColor: item.fill,
                  }}
                >
                  {item.tasks}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
