"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import axios from "axios";

type Project = {
  id: string;
  name: string;
  type: "INTERNAL" | "EXTERNAL";
};

export function ProjectTypeDistribution() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("/api/projects");
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch project types");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const counts = {
    INTERNAL: projects.filter((p) => p.type === "INTERNAL").length,
    EXTERNAL: projects.filter((p) => p.type === "EXTERNAL").length,
  };

  const data = [
    { name: "INTERNAL", value: counts.INTERNAL, color: "#3b82f6" },
    { name: "EXTERNAL", value: counts.EXTERNAL, color: "#22c55e" },
  ];

  const total = data.reduce((acc, item) => acc + item.value, 0);

  if (loading) return <p>Loading project distribution...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Types</CardTitle>
        <CardDescription>
          Distribution of internal vs external projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 mb-6">
            {data.map((item, index, arr) => {
              const percentage = (item.value / total) * 100;
              let startAngle = 0;
              for (let i = 0; i < index; i++) {
                startAngle += (arr[i].value / total) * 360;
              }
              const endAngle = startAngle + (percentage / 100) * 360;

              return (
                <div
                  key={item.name}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(${item.color} ${startAngle}deg, ${item.color} ${endAngle}deg, transparent ${endAngle}deg)`,
                    clipPath: "circle(50%)",
                  }}
                />
              );
            })}
          </div>

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
