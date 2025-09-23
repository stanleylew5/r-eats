"use client";
import { useState } from "react";
import { format, addDays, subDays, isBefore, isAfter } from "date-fns";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Menu from "./menu";

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
    console.log(selectedDate);
  };

  const goNext = () => {
    const nextDate = addDays(selectedDate, 1);
    if (!isAfter(nextDate, maxDate)) setSelectedDate(nextDate);
    console.log(selectedDate);
  };

  const computeCurrentMeal = (): MealType => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours * 60 + minutes;

    let newMeal: MealType = "breakfast";

    if (day >= 1 && day <= 5) {
      // Mon - Fri
      if (time >= 450 && time <= 629) newMeal = "breakfast";
      else if (time >= 630 && time <= 870) newMeal = "lunch";
      else if (time >= 1020 && time <= 1320) newMeal = "dinner";
    } else {
      // Sat - Sun
      if (time >= 600 && time <= 870) newMeal = "lunch";
      else if (time >= 1020 && time <= 1320) newMeal = "dinner";
    }
    return newMeal;
  };

  const [meal, setMeal] = useState<MealType | null>(computeCurrentMeal());
  const [diningHall, setDiningHall] = useState<DiningHall>("glasgow");

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
            className="relative hover:cursor-pointer"
          >
            Glasgow
          </TabsTrigger>
          <TabsTrigger
            value="lothian"
            className="relative hover:cursor-pointer"
          >
            Lothian
          </TabsTrigger>
        </TabsList>
        {/* <TabsContent value="glasgow">
        </TabsContent>
        <TabsContent value="lothian">
        </TabsContent> */}
      </Tabs>

      {meal === null ? (
        <div className="flex items-center justify-center py-10">
          <div className="border-reats-blue-100 border-t-reats-blue-200 h-8 w-8 animate-spin rounded-full border-4"></div>
        </div>
      ) : (
        <>
          <Tabs
            value={meal}
            onValueChange={(value) => setMeal(value as MealType)}
            className="mx-4 mt-4 mb-8 md:mx-12"
          >
            <TabsList>
              <TabsTrigger
                value="breakfast"
                className="relative hover:cursor-pointer"
              >
                Breakfast
              </TabsTrigger>
              <TabsTrigger
                value="lunch"
                className="relative hover:cursor-pointer"
              >
                Lunch
              </TabsTrigger>
              <TabsTrigger
                value="dinner"
                className="relative hover:cursor-pointer"
              >
                Dinner
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Menu
            meal={meal}
            diningHall={diningHall}
            selectedDate={selectedDate}
          />
        </>
      )}
    </div>
  );
};

export default Selector;
