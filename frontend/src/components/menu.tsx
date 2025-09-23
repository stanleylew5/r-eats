"use client";
import { format } from "date-fns";
import lothianData from "@/data/lothian.json";
import glasgowData from "@/data/glasgow.json";

interface Props {
  diningHall: "glasgow" | "lothian";
  meal: "breakfast" | "lunch" | "dinner" | "brunch";
  selectedDate: Date;
}

const dataMap = {
  glasgow: glasgowData,
  lothian: lothianData,
};

function normalizeMeal(meal: Props["meal"]) {
  if (meal === "brunch") return "lunch";
  return meal;
}

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
  const normalizedMeal = normalizeMeal(meal);
  const mealData = data[dateKey]?.[diningHall]?.[normalizedMeal];

  if (!mealData || Object.keys(mealData).length === 0) {
    return <ClosedMessage diningHall={diningHall} meal={normalizedMeal} />;
  }

  return (
    <div>
      {Object.entries(mealData).map(([section, items]) => (
        <div key={section}>
          <h2>{section}</h2>
          <ul>
            {(items as any[]).map((item, idx) => (
              <li key={idx}>
                {item.name}
                {item.dietary.length > 0 && (
                  <span> ({item.dietary.join(", ")})</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
