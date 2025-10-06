"use client";
import { useState, useEffect } from "react";
import { format, addDays, subDays, isBefore, isAfter } from "date-fns";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Menu from "./menu";
import Cookies from "js-cookie";
import Link from "next/link";

type MealType = "breakfast" | "lunch" | "dinner";
type DiningHall = "glasgow" | "lothian";

const Selector = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minDate = today;
  const maxDate = addDays(today, 13);

  const computeCurrentMeal = (): { meal: MealType; date: Date } => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours * 60 + minutes;

    const intervals: { start: number; end: number; meal: MealType }[] = [];

    if (day >= 1 && day <= 5) {
      // Mon-Fri if these clowns ever start changin the hours
      intervals.push({ start: 450, end: 629, meal: "breakfast" }); // 7:30-10:29
      intervals.push({ start: 630, end: 870, meal: "lunch" }); // 10:30-14:30
      intervals.push({ start: 1020, end: 1320, meal: "dinner" }); // 17:00-22:00
    } else {
      // Sat-Sun
      intervals.push({ start: 600, end: 870, meal: "lunch" }); // 10:00-14:30
      intervals.push({ start: 1020, end: 1320, meal: "dinner" }); // 17:00-22:00
    }

    const current = intervals.find((i) => time >= i.start && time <= i.end);
    if (current) return { meal: current.meal, date: today };

    const future = intervals.find((i) => time < i.start);
    if (future) return { meal: future.meal, date: today };

    return { meal: "breakfast", date: addDays(today, 1) };
  };

  const { meal: initialMeal, date: initialDate } = computeCurrentMeal();
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [meal, setMeal] = useState<MealType>(initialMeal);
  const [diningHall, setDiningHall] = useState<DiningHall>("glasgow");
  const [showDietary, setShowDietary] = useState<boolean>(true);
  const [hydrated, setHydrated] = useState(false);

  const goPrev = () => {
    const prevDate = subDays(selectedDate, 1);
    if (!isBefore(prevDate, minDate)) setSelectedDate(prevDate);
  };

  const goNext = () => {
    const nextDate = addDays(selectedDate, 1);
    if (!isAfter(nextDate, maxDate)) setSelectedDate(nextDate);
  };

  useEffect(() => {
    const cookieValue = Cookies.get("showDietary");
    if (cookieValue !== undefined) setShowDietary(cookieValue === "true");
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated)
      Cookies.set("showDietary", String(showDietary), { expires: 365 });
  }, [showDietary, hydrated]);

  if (!hydrated) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="border-t-reats-blue-200 border-reats-blue-100 h-12 w-12 animate-spin rounded-full border-4"></div>
      </div>
    );
  }

  return (
    <div>
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

      <Tabs
        value={diningHall}
        onValueChange={(value) => setDiningHall(value as DiningHall)}
        className="mx-4 mt-4 md:mx-12 md:mt-8"
      >
        <TabsList>
          <TabsTrigger
            value="glasgow"
            className="relative hover:cursor-pointer md:hover:opacity-50"
          >
            Glasgow
          </TabsTrigger>
          <TabsTrigger
            value="lothian"
            className="relative hover:cursor-pointer md:hover:opacity-50"
          >
            Lothian
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Tabs
        value={meal}
        onValueChange={(value) => setMeal(value as MealType)}
        className="mx-4 my-4 md:mx-12"
      >
        <TabsList>
          <TabsTrigger
            value="breakfast"
            className="relative hover:cursor-pointer md:hover:opacity-50"
          >
            Breakfast
          </TabsTrigger>
          <TabsTrigger
            value="lunch"
            className="relative hover:cursor-pointer md:hover:opacity-50"
          >
            Lunch
          </TabsTrigger>
          <TabsTrigger
            value="dinner"
            className="relative hover:cursor-pointer md:hover:opacity-50"
          >
            Dinner
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex justify-between">
        <div className="text-reats-blue-200 mb-4 ml-4 flex items-center justify-start text-sm font-medium hover:opacity-70 md:ml-12">
          <Link href="/hours">Dining Hours</Link>
        </div>
        <div className="text-reats-blue-200 mr-4 mb-4 flex items-center justify-end space-x-2 md:mr-12">
          <Label htmlFor="dietary-restrictions">Dietary Restrictions</Label>
          <Switch
            id="dietary-restrictions"
            checked={showDietary}
            onCheckedChange={setShowDietary}
          />
        </div>
      </div>

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
