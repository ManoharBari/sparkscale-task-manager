"use client"

import type React from "react"
import { Button } from "@/src/components/ui/button"
import { PlusCircle } from "lucide-react"

interface UserDashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  showAddButton?: boolean
  addButtonText?: string
  onAddClick?: () => void
}

export function UserDashboardHeader({
  heading,
  text,
  children,
  showAddButton = false,
  addButtonText = "Add New",
  onAddClick,
}: UserDashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      <div className="flex items-center gap-2">
        {showAddButton && (
          <Button onClick={onAddClick}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {addButtonText}
          </Button>
        )}
        {children}
      </div>
    </div>
  )
}
