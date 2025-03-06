"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { addMonths, format, subMonths } from "date-fns";
import { Button } from "./ui/button";

const VolunteerCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  return (
    <Card>
      <CardHeader>
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
      </CardHeader>
    </Card>
  );
};

export { VolunteerCalendar };
