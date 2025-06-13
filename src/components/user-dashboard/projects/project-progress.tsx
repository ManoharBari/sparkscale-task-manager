"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"

interface ProjectProgressProps {
  projectId: string
}

export function ProjectProgress({ projectId }: ProjectProgressProps) {
  // In a real app, this data would come from your database
  const data = [
    { name: "Completed", value: 8, color: "#22c55e" },
    { name: "In Progress", value: 5, color: "#3b82f6" },
    { name: "Not Started", value: 2, color: "#6b7280" },
  ]

  const totalTasks = data.reduce((sum, item) => sum + item.value, 0)
  const completionRate = Math.round((data[0].value / totalTasks) * 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
        <CardDescription>Task completion rate: {completionRate}%</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {/* Progress circle */}
          <div className="relative w-40 h-40 mb-6">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="transparent" stroke="#e5e7eb" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke="#22c55e"
                strokeWidth="10"
                strokeDasharray={`${completionRate * 2.83} ${(100 - completionRate) * 2.83}`}
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
              />
              <text
                x="50"
                y="50"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="20"
                fontWeight="bold"
                fill="currentColor"
              >
                {completionRate}%
              </text>
            </svg>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-1 gap-2 w-full">
            {data.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-medium">
                  {item.value} ({Math.round((item.value / totalTasks) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
