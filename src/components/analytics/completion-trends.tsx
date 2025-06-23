"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { useEffect, useState } from "react";

type CompletionData = {
  month: string;
  onTime: number;
  delayed: number;
};

export function CompletionTrends() {
  const [data, setData] = useState<CompletionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/analytics");
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const maxValue = Math.max(
    ...data.flatMap((item) => [item.onTime, item.delayed]),
    1
  );

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Task Completion Trends</CardTitle>
        <CardDescription>
          Monthly trends of on-time vs delayed task completions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="space-y-6">
            {/* Legend */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">On Time</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-sm">Delayed</span>
              </div>
            </div>

            {/* Bar Graph */}
            <div className="grid grid-cols-6 gap-4 h-[250px] items-end">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-1 h-full"
                >
                  <div className="flex-1 w-full flex flex-col justify-end">
                    <div
                      className="w-full bg-amber-500 rounded-t-sm"
                      style={{ height: `${(item.delayed / maxValue) * 100}%` }}
                    ></div>
                    <div
                      className="w-full bg-green-500 rounded-t-sm"
                      style={{ height: `${(item.onTime / maxValue) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium mt-2">{item.month}</span>
                </div>
              ))}
            </div>

            {/* Numbers below bars */}
            <div className="grid grid-cols-6 gap-4">
              {data.map((item, index) => (
                <div key={index} className="text-center text-xs">
                  <div className="text-green-600">{item.onTime}</div>
                  <div className="text-amber-600">{item.delayed}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
