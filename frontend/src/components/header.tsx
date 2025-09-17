import Image from "next/image";
import logo from "@/public/newlogo.webp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Glasgow from "./glasgow";
import Lothian from "./lothian";

const Header = () => {
  return (
    <div>
      <div className="mt-4 ml-4 flex items-center">
        <Image src={logo} alt="logo" className="w-1/14" />
        <p className="-translate-x-2 text-xl font-semibold text-blue-400">
          r&apos;eats
        </p>
      </div>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="glasgow">Glasgow</TabsTrigger>
          <TabsTrigger value="lothian">Lothian</TabsTrigger>
        </TabsList>
        <TabsContent value="glasgow">
          <Glasgow />
        </TabsContent>
        <TabsContent value="lothian">
          <Lothian />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Header;
