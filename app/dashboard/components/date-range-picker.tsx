"use client"

import * as React from "react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

export function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 5, 1),
    to: new Date(),
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <Calendar
        initialFocus
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
      />
      <div className="flex justify-end gap-2 px-4 pb-4">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Apply</Button>
      </div>
    </div>
  )
}
