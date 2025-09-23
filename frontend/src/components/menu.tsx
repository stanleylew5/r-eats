"use client";
import { format } from "date-fns";
import lothianData from "@/data/lothian.json";
import glasgowData from "@/data/glasgow.json";
import dietary from "@/data/dietary";
import Image from "next/image";
import logo from "@/public/newlogo.webp";
import Link from "next/link";
interface MenuItem {
  name: string;
  dietary: string[];
  nutrition: string;
}

type Station = Record<string, MenuItem[]>;
type Meal = Record<string, Station>;
type DiningHall = Record<string, Meal>;
type MenuData = Record<string, DiningHall>;

interface Props {
  diningHall: "glasgow" | "lothian";
  meal: "breakfast" | "lunch" | "dinner" | "brunch";
  selectedDate: Date;
  showDietary: boolean;
}

const dataMap: Record<Props["diningHall"], MenuData> = {
  glasgow: glasgowData,
  lothian: lothianData,
};

function capitalizeFirst(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function ClosedMessage({
  diningHall,
  meal,
}: {
  diningHall: string;
  meal: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-reats-blue-200 text-3xl font-semibold">Sorry!</p>
      <p className="py-4 font-medium">
        {capitalizeFirst(diningHall)} is closed for {capitalizeFirst(meal)}. Try
        another day!
      </p>
      <Image src={logo} alt="logo" />
    </div>
  );
}

export default function Menu({
  diningHall,
  meal,
  selectedDate,
  showDietary,
}: Props) {
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
            className="border-reats-blue-100 mx-4 mb-4 rounded-xl border-1 md:mx-12"
          >
            <p className="bg-reats-blue-50 mb-2 rounded-t-xl py-2 pl-2 text-lg font-semibold">
              {cleanStation}
            </p>
            <div
              className={`grid ${showDietary ? "grid-cols-1" : "grid-cols-2"} justify-center gap-x-2 px-4 md:grid-cols-4`}
            >
              {items.map((item, idx) => (
                <Link
                  href={item.nutrition ? item.nutrition : "/"}
                  key={idx}
                  target="_blank"
                  className={`border-reats-blue-100 hover:border-reats-blue-200 mb-2 rounded-lg ${showDietary ? "text-left" : "flex items-center justify-center md:justify-start"} border-1 p-2 hover:shadow-md`}
                >
                  <div
                    className={`font-medium ${showDietary ? "text-left" : "text-center"}`}
                  >
                    {item.name}
                  </div>
                  {showDietary && (
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
                  )}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
