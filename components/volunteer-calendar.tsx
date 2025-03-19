"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isSameMonth,
  isWeekend,
  startOfMonth,
  subMonths,
} from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
// Sample data for church services
const services = [
  {
    id: 1,
    date: new Date(2025, 2, 2, 19, 0),
    name: "Sunday Service",
    type: "Celebration",
  },
  {
    id: 2,
    date: new Date(2025, 2, 5, 19, 30),
    name: "Wednesday Service",
    type: "Teaching",
  },
  {
    id: 3,
    date: new Date(2025, 2, 9, 19, 0),
    name: "Sunday Service",
    type: "Celebration",
  },
  {
    id: 4,
    date: new Date(2025, 2, 12, 19, 30),
    name: "Wednesday Service",
    type: "Teaching",
  },
  {
    id: 5,
    date: new Date(2025, 2, 16, 19, 0),
    name: "Sunday Service",
    type: "Celebration",
  },
  {
    id: 6,
    date: new Date(2025, 2, 19, 19, 30),
    name: "Wednesday Service",
    type: "Teaching",
  },
  {
    id: 7,
    date: new Date(2025, 2, 23, 19, 0),
    name: "Sunday Service",
    type: "Celebration",
  },
  {
    id: 8,
    date: new Date(2025, 2, 26, 19, 30),
    name: "Wednesday Service",
    type: "Teaching",
  },
  {
    id: 9,
    date: new Date(2025, 2, 30, 19, 0),
    name: "Sunday Service",
    type: "Celebration",
  },
];

// Sample data for volunteer availability
const initialAvailability = [
  { id: 1, serviceId: 1, volunteerId: 1, name: "John Smith", role: "Worship" },
  {
    id: 2,
    serviceId: 1,
    volunteerId: 2,
    name: "Mary Johnson",
    role: "Welcome",
  },
  {
    id: 3,
    serviceId: 2,
    volunteerId: 3,
    name: "Peter Williams",
    role: "Media",
  },
  { id: 4, serviceId: 3, volunteerId: 1, name: "John Smith", role: "Worship" },
  {
    id: 5,
    serviceId: 5,
    volunteerId: 2,
    name: "Mary Johnson",
    role: "Welcome",
  },
];

const VolunteerCalendar = () => {
  const currentUser = { id: 1, name: "John Smith" };
  const [currentDate, setCurrentDate] = useState(new Date());
  const availability = initialAvailability;

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  // Calculate days from previous month to fill the first week
  const dayOfWeekOfFirstDay = getDay(firstDayOfMonth); // 0 for Sunday, 1 for Monday, etc.
  const previousMonthDays = Array.from(
    { length: dayOfWeekOfFirstDay },
    (_, i) => {
      return addDays(firstDayOfMonth, -dayOfWeekOfFirstDay + i);
    }
  );

  // Calculate days from next month to fill the last week
  const remainingDays = 7 - ((dayOfWeekOfFirstDay + daysInMonth.length) % 7);
  const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => {
    return addDays(lastDayOfMonth, i + 1);
  });

  // Combine all days to display
  const allDaysToDisplay = [
    ...previousMonthDays,
    ...daysInMonth,
    ...nextMonthDays,
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const getServicesOnDay = (day: Date) => {
    return services.filter((service) => isSameDay(service.date, day));
  };

  const getVolunteersForService = (serviceId: number) => {
    return availability.filter((a) => a.serviceId === serviceId);
  };
  const isUserVolunteering = (serviceId: number) => {
    return (
      currentUser &&
      availability.some(
        (a) => a.serviceId === serviceId && a.volunteerId === currentUser.id
      )
    );
  };

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5" />
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
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
          {allDaysToDisplay.map((day, i) => {
            const servicesOnDay = getServicesOnDay(day);
            const hasService = servicesOnDay.length > 0;
            const isCurrentMonth = isSameMonth(day, currentDate);
            const userVolunteeringToday = servicesOnDay.some((service) =>
              isUserVolunteering(service.id)
            );

            return (
              <div
                key={i}
                className={`
                        min-h-[80px] p-1 border rounded-md relative
                        ${!isCurrentMonth ? "opacity-40" : ""}
                        ${isWeekend(day) ? "bg-muted/30" : ""}
                        ${hasService ? "ring-1 ring-primary/20" : ""}
                        ${
                          userVolunteeringToday
                            ? "bg-green-100 dark:bg-green-900"
                            : ""
                        }
                        hover:bg-muted/50 cursor-pointer transition-colors
                      `}
              >
                <div className="text-right text-sm">{format(day, "d")}</div>
                <div className="mt-1 space-y-1">
                  {servicesOnDay.map((service) => {
                    const volunteers = getVolunteersForService(service.id);
                    const userVolunteering = isUserVolunteering(service.id);
                    return (
                      <div key={service.id} className="text-xs">
                        <Badge
                          variant="outline"
                          className={`
                                  text-[10px] whitespace-nowrap overflow-hidden text-ellipsis font-semibold
                                  ${
                                    userVolunteering
                                      ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
                                      : "bg-primary text-primary-foreground"
                                  }
                                `}
                        >
                          {format(service.date, "HH:mm")} - {service.name}
                        </Badge>
                        {volunteers.length > 0 && (
                          <div className="mt-1 pl-1">
                            {volunteers.slice(0, 2).map((v) => (
                              <div key={v.id} className="text-[10px] truncate">
                                {v.name} ({v.role})
                              </div>
                            ))}
                            {volunteers.length > 2 && (
                              <div className="text-[10px] text-muted-foreground">
                                +{volunteers.length - 2} more
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export { VolunteerCalendar };
