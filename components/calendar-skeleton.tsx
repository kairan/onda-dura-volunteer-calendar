import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface CalendarSkeletonProps {
  currentDate: Date
}

export function CalendarSkeleton({ currentDate }: CalendarSkeletonProps) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold text-muted-foreground">{format(currentDate, "MMMM yyyy")}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-sm font-medium py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="min-h-[80px] p-1 border rounded-md">
              <div className="text-right">
                <Skeleton className="h-5 w-5 ml-auto" />
              </div>
              <div className="mt-2 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

