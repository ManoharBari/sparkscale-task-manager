"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"

export function ProjectStatusChart() {
  // In a real app, this data would come from your database
  const data = [
    { name: "ONGOING", value: 8, color: "#3b82f6" },
    { name: "COMPLETED", value: 5, color: "#22c55e" },
    { name: "DELAYED", value: 2, color: "#f59e0b" },
    { name: "ON_HOLD", value: 1, color: "#6b7280" },
  ]

  const total = data.reduce((acc, item) => acc + item.value, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Status</CardTitle>
        <CardDescription>Distribution of projects by status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {/* Donut chart using CSS */}
          <div className="relative w-48 h-48 mb-6">
            {data.map((item, index, arr) => {
              // Calculate the percentage and angles for the donut segments
              const percentage = (item.value / total) * 100
              let startAngle = 0
              for (let i = 0; i < index; i++) {
                startAngle += (arr[i].value / total) * 360
              }
              const endAngle = startAngle + (percentage / 100) * 360

              return (
                <div
                  key={item.name}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(${item.color} ${startAngle}deg, ${item.color} ${endAngle}deg, transparent ${endAngle}deg)`,
                    clipPath: "circle(50%)",
                  }}
                />
              )
            })}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white dark:bg-background w-24 h-24 rounded-full"></div>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-4">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm">
                  {item.name}: {item.value} ({Math.round((item.value / total) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
