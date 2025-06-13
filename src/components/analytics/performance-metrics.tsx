"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"

export function PerformanceMetrics() {
  // In a real app, this data would come from your database
  const metrics = [
    {
      name: "Avg. Task Completion Time",
      value: "3.2 days",
      change: "+5%",
      trend: "up",
    },
    {
      name: "On-time Delivery Rate",
      value: "87%",
      change: "+2%",
      trend: "up",
    },
    {
      name: "Resource Utilization",
      value: "76%",
      change: "-3%",
      trend: "down",
    },
    {
      name: "Task Reassignment Rate",
      value: "12%",
      change: "-5%",
      trend: "down",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>Key performance indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
              <div>
                <div className="font-medium">{metric.name}</div>
                <div className="text-2xl">{metric.value}</div>
              </div>
              <div className={`text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {metric.change}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
