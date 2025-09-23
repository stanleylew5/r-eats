"use client";
import { useState, useEffect } from "react";
import { format, addDays, subDays, isBefore, isAfter } from "date-fns";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Menu from "./menu";
import Cookies from "js-cookie";

type MealType = "breakfast" | "lunch" | "dinner";
type DiningHall = "glasgow" | "lothian";

const Selector = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const minDate = today;
  const maxDate = addDays(today, 14);

  const goPrev = () => {
    const prevDate = subDays(selectedDate, 1);
    if (!isBefore(prevDate, minDate)) setSelectedDate(prevDate);
  };

  const goNext = () => {
    const nextDate = addDays(selectedDate, 1);
    if (!isAfter(nextDate, maxDate)) setSelectedDate(nextDate);
  };

  const computeCurrentMeal = (): MealType => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours * 60 + minutes;

    const intervals: { start: number; end: number; meal: MealType }[] = [];

    if (day >= 1 && day <= 5) {
      // Mon-Fri
      intervals.push({ start: 450, end: 629, meal: "breakfast" }); // 7:30-10:29
      intervals.push({ start: 630, end: 870, meal: "lunch" }); // 10:30-14:30
      intervals.push({ start: 1020, end: 1320, meal: "dinner" }); // 17:00-22:00
    } else {
      // Sat-Sun
      intervals.push({ start: 600, end: 870, meal: "lunch" }); // 10:00-14:30
      intervals.push({ start: 1020, end: 1320, meal: "dinner" }); // 17:00-22:00
    }

    const current = intervals.find((i) => time >= i.start && time <= i.end);
    if (current) return current.meal;

    const future = intervals.find((i) => time < i.start);
    if (future) return future.meal;

    return intervals[0].meal;
  };

  const [meal, setMeal] = useState<MealType>(computeCurrentMeal());
  const [diningHall, setDiningHall] = useState<DiningHall>("glasgow");
  const [showDietary, setShowDietary] = useState<boolean>(true);
  const [hydrated, setHydrated] = useState(false);

  // Load cookie on client
  useEffect(() => {
    const cookieValue = Cookies.get("showDietary");
    if (cookieValue !== undefined) setShowDietary(cookieValue === "true");
    setHydrated(true);
  }, []);

  // Save cookie when changed
  useEffect(() => {
    if (hydrated)
      Cookies.set("showDietary", String(showDietary), { expires: 365 });
  }, [showDietary, hydrated]);

  // Show loading spinner until hydrated
  if (!hydrated) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="border-t-reats-blue-200 border-reats-blue-100 h-12 w-12 animate-spin rounded-full border-4"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Date Selector */}
      <div className="bg-reats-blue-150 border-reats-gray-100 flex items-center justify-center gap-4 border-b-1 py-4">
        <button
          onClick={goPrev}
          disabled={isBefore(subDays(selectedDate, 1), minDate)}
          className="hover:bg-reats-blue-200 border-reats-blue-100 text-reats-blue-200 rounded-md border bg-white px-3 py-2 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-blue-600"
        >
          &lt;
        </button>

        <p className="text-reats-blue-200 w-60 text-center text-lg font-medium">
          {format(selectedDate, "EEEE, MMMM d")}
        </p>

        <button
          onClick={goNext}
          disabled={isAfter(addDays(selectedDate, 1), maxDate)}
          className="hover:bg-reats-blue-200 border-reats-blue-100 text-reats-blue-200 rounded-md border bg-white px-3 py-2 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-blue-600"
        >
          &gt;
        </button>
      </div>

      {/* Dining Hall Tabs */}
      <Tabs
        value={diningHall}
        onValueChange={(value) => setDiningHall(value as DiningHall)}
        className="mx-4 mt-4 md:mx-12 md:mt-8"
      >
        <TabsList>
          <TabsTrigger
            value="glasgow"
            className="relative hover:cursor-pointer hover:opacity-50"
          >
            Glasgow
          </TabsTrigger>
          <TabsTrigger
            value="lothian"
            className="relative hover:cursor-pointer hover:opacity-50"
          >
            Lothian
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Meal Tabs */}
      <Tabs
        value={meal}
        onValueChange={(value) => setMeal(value as MealType)}
        className="mx-4 my-4 md:mx-12"
      >
        <TabsList>
          <TabsTrigger
            value="breakfast"
            className="relative hover:cursor-pointer hover:opacity-50"
          >
            Breakfast
          </TabsTrigger>
          <TabsTrigger
            value="lunch"
            className="relative hover:cursor-pointer hover:opacity-50"
          >
            Lunch
          </TabsTrigger>
          <TabsTrigger
            value="dinner"
            className="relative hover:cursor-pointer hover:opacity-50"
          >
            Dinner
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Dietary Switch */}
      <div className="text-reats-blue-200 mr-12 mb-4 ml-4 flex items-center justify-start space-x-2 md:ml-0 md:justify-end">
        <Switch
          id="dietary-restrictions"
          checked={showDietary}
          onCheckedChange={setShowDietary}
        />
        <Label htmlFor="dietary-restrictions">Dietary Restrictions</Label>
      </div>

      {/* Menu */}
      <Menu
        meal={meal}
        diningHall={diningHall}
        selectedDate={selectedDate}
        showDietary={showDietary}
      />
    </div>
  );
};

export default Selector;
