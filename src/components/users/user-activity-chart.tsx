"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"

export function UserActivityChart() {
  // In a real app, this data would come from your database
  const data = [
    { date: "Mon", logins: 24, tasks: 12 },
    { date: "Tue", logins: 18, tasks: 10 },
    { date: "Wed", logins: 30, tasks: 15 },
    { date: "Thu", logins: 26, tasks: 14 },
    { date: "Fri", logins: 22, tasks: 8 },
    { date: "Sat", logins: 12, tasks: 5 },
    { date: "Sun", logins: 8, tasks: 3 },
  ]

  const maxValue = Math.max(...data.flatMap((item) => [item.logins, item.tasks]))

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Activity</CardTitle>
        <CardDescription>Weekly user logins and task completions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm">Logins</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Tasks Completed</span>
            </div>
          </div>

          <div className="relative">
            {/* Grid lines */}
            <div className="absolute inset-0 border-t border-dashed border-gray-200"></div>
            <div className="absolute inset-0 top-1/4 border-t border-dashed border-gray-200"></div>
            <div className="absolute inset-0 top-2/4 border-t border-dashed border-gray-200"></div>
            <div className="absolute inset-0 top-3/4 border-t border-dashed border-gray-200"></div>

            {/* Chart */}
            <div className="grid grid-cols-7 gap-2 h-[150px] items-end pt-4">
              {data.map((item, index) => (
                <div key={index} className="relative h-full flex items-end">
                  {/* Login line */}
                  <div className="absolute inset-x-0 flex justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    {index > 0 && (
                      <div
                        className="absolute right-1/2 w-full h-0.5 bg-blue-500 -translate-y-[1px]"
                        style={{
                          width: `calc(100% + 0.5rem)`,
                          transform: `rotate(${Math.atan2(
                            ((data[index].logins - data[index - 1].logins) / maxValue) * 150,
                            1,
                          )}rad) translateY(-1px)`,
                          transformOrigin: "left center",
                        }}
                      ></div>
                    )}
                  </div>

                  {/* Task line */}
                  <div
                    className="absolute inset-x-0 flex justify-center"
                    style={{ bottom: `${(item.tasks / maxValue) * 100}%` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    {index > 0 && (
                      <div
                        className="absolute right-1/2 w-full h-0.5 bg-green-500 -translate-y-[1px]"
                        style={{
                          width: `calc(100% + 0.5rem)`,
                          transform: `rotate(${Math.atan2(
                            ((data[index].tasks - data[index - 1].tasks) / maxValue) * 150,
                            1,
                          )}rad) translateY(-1px)`,
                          transformOrigin: "left center",
                        }}
                      ></div>
                    )}
                  </div>

                  <div className="w-full text-center text-xs mt-2">{item.date}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {data.map((item, index) => (
              <div key={index} className="text-center text-xs">
                <div>
                  {item.logins}/{item.tasks}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
