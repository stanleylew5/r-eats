import Image from "next/image";
import logo from "@/public/newlogo.webp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Glasgow from "./glasgow";
import Lothian from "./lothian";

const Header = () => {
  return (
    <div className="border-reats-blue-100 border-b-1 px-[10%]">
      <div className="mt-8 ml-4 flex items-center">
        <Image src={logo} alt="logo" className="w-[75px]" />
        <p className="text-reats-blue-100 ml-2 text-xl font-semibold">
          R&apos;Eats
        </p>
      </div>
      <Tabs defaultValue="glasgow" className="mt-8">
        <TabsList>
          <TabsTrigger
            value="glasgow"
            className={
              "after:bg-reats-blue-200 data-[state=active]:after:animate-border-grow relative after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-0 after:transition-all after:duration-300 after:content-[''] data-[state=active]:after:w-full"
            }
          >
            Glasgow
          </TabsTrigger>

          <TabsTrigger
            value="lothian"
            className={
              "after:bg-reats-blue-200 data-[state=active]:after:animate-border-grow relative after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-0 after:transition-all after:duration-300 after:content-[''] data-[state=active]:after:w-full"
            }
          >
            Lothian
          </TabsTrigger>
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
