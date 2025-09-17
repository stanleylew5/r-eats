import Image from "next/image";
import logo from "@/public/newlogo.webp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Glasgow from "./glasgow";
import Lothian from "./lothian";

const Header = () => {
  return (
    <div className="mx-auto w-5/6">
      <div className="mt-8 ml-4 flex items-center">
        <Image src={logo} alt="logo" className="w-[75px]" />
        <p className="text-reats-blue-100 ml-2 text-xl font-semibold">
          R&apos;Eats
        </p>
      </div>
      <Tabs defaultValue="glasgow" className="mt-8">
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
