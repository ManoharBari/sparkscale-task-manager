"use client"

import type React from "react"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

export const Chart = ({ children, data, layout }: { children: React.ReactNode; data?: any; layout?: string }) => {
  if (layout === "vertical") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout={layout}>
          {children}
        </BarChart>
      </ResponsiveContainer>
    )
  }

  if (!data) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>{children}</PieChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>{children}</LineChart>
    </ResponsiveContainer>
  )
}

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ChartLine = ({
  dataKey,
  stroke,
  strokeWidth,
  dot,
  name,
}: { dataKey: string; stroke: string; strokeWidth: number; dot: any; name: string }) => {
  return <Line type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={strokeWidth} dot={dot} name={name} />
}

export const ChartXAxis = ({ dataKey, type }: { dataKey: string; type?: string }) => {
  return <XAxis dataKey={dataKey} type={type} />
}

export const ChartYAxis = ({ dataKey, type, width }: { dataKey?: string; type?: string; width?: number }) => {
  return <YAxis dataKey={dataKey} type={type} width={width} />
}

export const ChartTooltip = () => {
  return <Tooltip />
}

export const ChartLegend = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-wrap gap-4 justify-center">{children}</div>
}

export const ChartLegendItem = ({ color, children }: { color: string; children: React.ReactNode }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-sm">{children}</span>
    </div>
  )
}

export const ChartPie = ({
  data,
  dataKey,
  nameKey,
  innerRadius,
  outerRadius,
}: { data: any; dataKey: string; nameKey: string; innerRadius: number; outerRadius: number }) => {
  return (
    <Pie
      data={data}
      dataKey={dataKey}
      nameKey={nameKey}
      cx="50%"
      cy="50%"
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      fill="#8884d8"
      label
    >
      {data.map((entry: any, index: number) => (
        <Cell key={`cell-${index}`} fill={entry.color} />
      ))}
    </Pie>
  )
}

export const ChartBar = ({
  dataKey,
  fill,
  radius,
  name,
  stackId,
}: { dataKey: string; fill: string; radius?: number[]; name?: string; stackId?: string }) => {
  return <Bar dataKey={dataKey} fill={fill} radius={radius} name={name} stackId={stackId} />
}
