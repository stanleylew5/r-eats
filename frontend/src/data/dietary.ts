import {
  Vegan,
  Leaf,
  WheatOff,
  Fish,
  Milk,
  Wheat,
  Egg,
  Shrimp,
  Bean,
  Nut,
} from "lucide-react";
import { GiPeanut, GiSesame } from "react-icons/gi";
interface DietaryConfig {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  label: string;
}

const dietary: Record<string, DietaryConfig> = {
  Vegan: {
    icon: Vegan,
    color: "bg-green-600 text-white",
    label: "VG",
  },
  Vegetarian: {
    icon: Leaf,
    color: "bg-lime-600 text-white",
    label: "V",
  },
  "Gluten Free": {
    icon: WheatOff,
    color: "bg-purple-600 text-white",
    label: "GF",
  },
  "Contains Milk": {
    icon: Milk,
    color: "bg-blue-600 text-white",
    label: "Milk",
  },
  "Contains Eggs": {
    icon: Egg,
    color: "bg-orange-600  text-white",
    label: "Egg",
  },
  "Contains Fish": {
    icon: Fish,
    color: "bg-teal-600  text-white",
    label: "F",
  },
  "Contains Wheat": {
    icon: Wheat,
    color: "bg-yellow-600  text-white",
    label: "W",
  },
  "Contains Crustacean Shellfish": {
    icon: Shrimp,
    color: "bg-red-600  text-white",
    label: "C",
  },
  "Contains Tree Nuts": {
    icon: Nut,
    color: "bg-orange-600 text-white",
    label: "TN",
  },
  "Contains Peanuts": {
    icon: GiPeanut,
    color: "bg-yellow-900 text-white",
    label: "PN",
  },
  "Contains Soybeans": {
    icon: Bean,
    color: "bg-orange-300 text-white",
    label: "SB",
  },
  "Contains Sesame": {
    icon: GiSesame,
    color: "bg-black text-white",
    label: "S",
  },
};

export default dietary;
