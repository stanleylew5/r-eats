import Image from "next/image";
import logo from "@/public/newlogo.webp";
/* import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Glasgow from "./glasgow";
import Lothian from "./lothian"; */

const Header = () => {
  return (
    <div>
      <div className="bg-reats-blue-200 flex items-center justify-center py-6">
        <Image src={logo} alt="logo" className="w-[70px]" />
        <p className="ml-2 text-3xl font-semibold text-white">R&apos;Eats</p>
      </div>
    </div>
  );
};

export default Header;
