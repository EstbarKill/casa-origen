"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2", className)}
      classNames={{
        month: "space-y-6",

        caption:
          "flex justify-center pt-2 relative items-center mb-4",

        caption_label:
          "text-xl font-serif tracking-widest text-white uppercase",

        nav: "flex items-center gap-2",

        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          `
          h-7
          w-7
          rounded-full
          border
          border-[#D68B2C]/90
          bg-transparent
          text-red-800
          hover:bg-[#D68B2C]/20
          hover:border-[#D68B2C]
          transition-all
          duration-300
          `
        ),

        nav_button_previous: "absolute left-0",
        nav_button_next: "absolute right-0",

        table: "w-full border-collapse",

        head_row: "hidden flex justify-between",

        head_cell: "hidden w-10 text-center text-sm font-medium text-zinc-400 uppercase",

        row: "flex w-full justify-between",

        cell: `
          relative
          h-10
          w-10  
          text-center
          text-xl
          p-0
          [&:has([aria-selected])]:z-10
        `,

        day: cn(
          buttonVariants({ variant: "ghost" }),
          `
          h-10
          w-10
          rounded-full
          p-0
          font-normal
          text-white
          transition-all
          duration-300
          hover:bg-[#D68B2C]/20
          hover:text-primary
          hover:scale-105
          `
        ),

        day_selected: `
          bg-gradient-to-br
          from-[#D68B2C]
          to-[#F0B35A]
          text-white
          font-semibold
          shadow-lg
          shadow-[#D68B2C]/30
          scale-110
          hover:from-[#D68B2C]
          hover:to-[#F0B35A]
          hover:text-white
        `,

        day_today: `
          border
          border-[#D68B2C]
          text-[#D68B2C]
          font-semibold
        `,

        day_outside:
          "text-zinc-600 opacity-40",

        day_disabled:
          "text-zinc-600 opacity-30 cursor-not-allowed",

        day_range_middle:
          "bg-[#D68B2C]/20 text-white",

        day_range_end:
          "bg-[#D68B2C] text-black",

        day_hidden: "invisible",

        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft
            className={cn("h-5 w-5", className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight
            className={cn("h-5 w-5", className)}
            {...props}
          />
        ),
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }