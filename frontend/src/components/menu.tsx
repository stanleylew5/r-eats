"use client";
import { format } from "date-fns";
import lothianData from "@/data/lothian.json";
import glasgowData from "@/data/glasgow.json";
import dietary from "@/data/dietary";
interface MenuItem {
  name: string;
  dietary: string[];
}

type Station = Record<string, MenuItem[]>;
type Meal = Record<string, Station>;
type DiningHall = Record<string, Meal>;
type MenuData = Record<string, DiningHall>;

interface Props {
  diningHall: "glasgow" | "lothian";
  meal: "breakfast" | "lunch" | "dinner" | "brunch";
  selectedDate: Date;
}

const dataMap: Record<Props["diningHall"], MenuData> = {
  glasgow: glasgowData,
  lothian: lothianData,
};

function ClosedMessage({
  diningHall,
  meal,
}: {
  diningHall: string;
  meal: string;
}) {
  return (
    <div className="p-4 text-center text-red-600">
      Sorry! {diningHall} is closed at {meal}.
    </div>
  );
}

export default function Menu({ diningHall, meal, selectedDate }: Props) {
  const dateKey = format(selectedDate, "MM/dd/yyyy");

  const data = dataMap[diningHall];

  const diningHallData =
    data[dateKey]?.[diningHall.charAt(0).toUpperCase() + diningHall.slice(1)];
  const mealData =
    diningHallData?.[meal.charAt(0).toUpperCase() + meal.slice(1)];

  if (!mealData || Object.keys(mealData).length === 0) {
    return <ClosedMessage diningHall={diningHall} meal={meal} />;
  }

  return (
    <div>
      {Object.entries(mealData).map(([station, items]) => {
        const cleanStation = station.replace(/^--\s*|\s*--$/g, "").trim();

        return (
          <div
            key={station}
            className="border-reats-blue-100 mx-12 mb-4 rounded-xl border-1"
          >
            <p className="bg-reats-blue-50 mb-2 py-2 pl-2 text-lg font-semibold">
              {cleanStation}
            </p>
            <div className="grid grid-cols-1 justify-center gap-x-2 px-4 md:grid-cols-4">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="border-reats-blue-100 mb-2 rounded-xl border-1 p-2"
                >
                  <div className="font-medium">{item.name}</div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {item.dietary.map((restriction, i) => {
                      const config = dietary[restriction];
                      if (!config) return null;
                      const Icon = config.icon;
                      return (
                        <div
                          key={i}
                          className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${config.color}`}
                        >
                          <Icon className="h-3 w-3" />
                          <span>{config.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
