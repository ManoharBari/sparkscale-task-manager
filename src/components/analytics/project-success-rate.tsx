"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

export function ProjectSuccessRate() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/project-success-rate");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data || data.length === 0) return <p>No project data found.</p>;

  const totalProjects = data.reduce((sum, item) => sum + item.value, 0);
  const successRate = Math.round((data[0].value / totalProjects) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Success Rate</CardTitle>
        <CardDescription>
          On-time completion rate: {successRate}%
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 mb-6">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke="#22c55e"
                strokeWidth="10"
                strokeDasharray={`${successRate * 2.83} ${
                  (100 - successRate) * 2.83
                }`}
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
                {successRate}%
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-1 gap-2 w-full">
            {data.map((item: any) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-medium">
                  {item.value} ({Math.round((item.value / totalProjects) * 100)}
                  %)
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
