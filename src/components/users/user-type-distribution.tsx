"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { useEffect, useState } from "react";

export function UserTypeDistribution() {
  const [data, setData] = useState<
    { name: string; value: number; color: string }[]
  >([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchDistribution = async () => {
      try {
        const res = await fetch("/api/user/user-type-distribution");
        const json = await res.json();
        const result = [
          { name: "Admin Users", value: json.admin, color: "#3b82f6" },
          { name: "Regular Users", value: json.user, color: "#22c55e" },
        ];
        setData(result);
        setTotal(json.admin + json.user);
      } catch (error) {
        console.error("Failed to fetch user type distribution", error);
      }
    };

    fetchDistribution();
  }, []);

  // Generate gradient only if data is loaded
  const getConicGradient = () => {
    let startAngle = 0;
    return data
      .map((item) => {
        const percentage = (item.value / total) * 100;
        const angle = (percentage / 100) * 360;
        const endAngle = startAngle + angle;
        const gradient = `${item.color} ${startAngle}deg ${endAngle}deg`;
        startAngle = endAngle;
        return gradient;
      })
      .join(", ");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Types</CardTitle>
        <CardDescription>
          Distribution of admin vs regular users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {/* Pie Chart */}
          <div className="relative w-40 h-40 mb-6">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(${getConicGradient()})`,
              }}
            />
            {/* Center white circle for donut effect */}
            <div className="absolute inset-5 bg-white rounded-full"></div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-1 gap-2 w-full">
            {data.map((item) => (
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
                  {item.value} ({Math.round((item.value / total) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
