"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import lothianData from "@/data/lothian.json";
import glasgowData from "@/data/glasgow.json";
import { useToast } from "@/context/toast";

interface MenuItem {
  name: string;
  dietary: string[];
  nutrition: string;
}

type Station = Record<string, MenuItem[]>;
type Meal = Record<string, Station>;
type DiningHall = Record<string, Meal>;
type MenuData = Record<string, DiningHall>;

interface SearchResult {
  foodName: string;
  location: string;
  date: string;
  meal: string;
}

const dataMap: Record<string, MenuData> = {
  glasgow: glasgowData,
  lothian: lothianData,
};

const SearchFood = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const { addToast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return;
    }

    const foundResults: SearchResult[] = [];

    // Search through all dining halls
    Object.entries(dataMap).forEach(([hallName, hallData]) => {
      // Search through all dates
      Object.entries(hallData).forEach(([date, dateData]) => {
        // Search through all dining hall locations
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(dateData).forEach(([_, mealTypes]) => {
          // Search through all meals
          Object.entries(mealTypes).forEach(([mealName, stations]) => {
            // Search through all stations
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            Object.entries(stations).forEach(([_, items]) => {
              // Search through all menu items
              items.forEach((item: MenuItem) => {
                if (item.name.toLowerCase().includes(query)) {
                  foundResults.push({
                    foodName: item.name,
                    location:
                      hallName.charAt(0).toUpperCase() + hallName.slice(1),
                    date: date,
                    meal: mealName,
                  });
                }
              });
            });
          });
        });
      });
    });

    if (foundResults.length === 0) {
      addToast(
        `"${searchQuery}" isn't on the menu in the future. Try searching for something else!`,
        "error",
      );
    } else {
      setResults(foundResults);
      setShowModal(true);
    }
  };

  return (
    <div>
      {/* Desktop Search Bar - Hidden on screens smaller than md */}
      <form onSubmit={handleSearch} className="hidden gap-2 md:flex">
        <input
          type="text"
          placeholder="Search for a food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-reats-blue-200 focus:border-reats-blue-300 flex-1 rounded-lg border-2 bg-white px-4 py-2 text-sm focus:outline-none"
        />
        <button
          type="submit"
          className="text-reats-blue-200 flex items-center rounded-lg bg-white px-2 transition hover:scale-105 hover:cursor-pointer"
        >
          <CiSearch className="text-2xl" />
        </button>
      </form>

      {/* Mobile Search Button - Visible only on screens smaller than md */}
      <button
        onClick={() => setShowSearchModal(true)}
        className="text-reats-blue-200 hover:bg-reats-blue-300 flex items-center rounded-lg bg-white p-2 transition md:hidden"
      >
        <CiSearch className="text-2xl" />
      </button>

      {/* Mobile Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="mx-4 flex w-full flex-col gap-4 rounded-xl bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Search for a food</h2>
              <button
                onClick={() => setShowSearchModal(false)}
                className="rounded-lg p-1 transition hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                handleSearch(e);
                setShowSearchModal(false);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Search for a food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-reats-blue-200 focus:border-reats-blue-300 flex-1 rounded-lg border-2 px-4 py-2 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="bg-reats-blue-200 hover:bg-reats-blue-300 flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-white transition"
              >
                <CiSearch className="text-xl" />
              </button>
            </form>
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={() => setShowModal(false)}
        >
          <div
            className="mx-4 flex max-h-96 w-full max-w-3xl flex-col rounded-xl bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-semibold">
                Found {results.length} matching food item
                {results.length !== 1 ? "s" : ""}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1 transition hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-reats-blue-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Food Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Meal
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map(({ foodName, location, meal, date }, idx) => (
                    <tr
                      key={idx}
                      className={`${idx !== results.length - 1 ? "border-b border-gray-200" : ""} transition`}
                    >
                      <td className="px-6 py-3 text-xs md:text-sm">
                        {foodName}
                      </td>
                      <td className="px-6 py-3 text-xs md:text-sm">
                        {location}
                      </td>
                      <td className="px-6 py-3 text-xs md:text-sm">{meal}</td>
                      <td className="px-6 py-3 text-xs md:text-sm">{date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFood;
