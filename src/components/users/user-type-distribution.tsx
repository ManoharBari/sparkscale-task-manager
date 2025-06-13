"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"

export function UserTypeDistribution() {
  // In a real app, this data would come from your database
  const data = [
    { name: "Admin Users", value: 4, color: "#3b82f6" },
    { name: "Regular Users", value: 20, color: "#22c55e" },
  ]

  const total = data.reduce((acc, item) => acc + item.value, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Types</CardTitle>
        <CardDescription>Distribution of admin vs regular users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {/* Simple pie chart using CSS */}
          <div className="relative w-40 h-40 mb-6">
            {data.map((item, index, arr) => {
              // Calculate the percentage and angles for the pie segments
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
                  {item.value} ({Math.round((item.value / total) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
