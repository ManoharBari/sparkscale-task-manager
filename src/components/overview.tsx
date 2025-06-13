"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"

export function Overview() {
  // In a real app, this data would come from your database
  const data = [
    { date: "Jan", tasks: 10, completed: 8 },
    { date: "Feb", tasks: 15, completed: 12 },
    { date: "Mar", tasks: 12, completed: 10 },
    { date: "Apr", tasks: 18, completed: 14 },
    { date: "May", tasks: 20, completed: 17 },
    { date: "Jun", tasks: 25, completed: 20 },
  ]

  const maxValue = Math.max(...data.flatMap((item) => [item.tasks, item.completed]))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Overview</CardTitle>
        <CardDescription>Task creation vs completion over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm">Created Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Completed Tasks</span>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2 h-[200px] items-end">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <div className="w-full flex flex-col items-center gap-1">
                  <div
                    className="w-4 bg-blue-500 rounded-t-sm"
                    style={{ height: `${(item.tasks / maxValue) * 180}px` }}
                  ></div>
                  <div
                    className="w-4 bg-green-500 rounded-t-sm"
                    style={{ height: `${(item.completed / maxValue) * 180}px` }}
                  ></div>
                </div>
                <span className="text-xs">{item.date}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-6 gap-2">
            {data.map((item, index) => (
              <div key={index} className="text-center text-xs">
                <div>
                  {item.tasks}/{item.completed}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
