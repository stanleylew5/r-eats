import Image from "next/image";
import logo from "@/public/newlogo.webp";
import Link from "next/link";
import { Info } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-reats-blue-200">
      <div className="relative flex items-center justify-center py-6">
        {/* centered brand */}
        <Link href="/" className="z-10 flex items-center">
          <Image src={logo} alt="logo" className="w-[70px]" />
          <p className="ml-2 text-3xl font-semibold text-white">R&apos;Eats</p>
        </Link>

        <div className="absolute top-1/2 right-4 hidden -translate-y-1/2 transform md:block">
          <Link
            href="/legend"
            className="bg-reats-blue-200 hover:text-reats-blue-200 flex items-center justify-center rounded-xl border-2 border-white pt-2 pr-4 pb-2 pl-2 font-medium text-white hover:bg-white"
          >
            <Info className="mr-2 text-lg" />
            Icon Legend
          </Link>
        </div>
      </div>

      <div className="flex justify-center pb-4 md:hidden">
        <Link
          href="/legend"
          className="bg-reats-blue-200 hover:text-reats-blue-200 flex items-center justify-center rounded-xl border-2 border-white pt-2 pr-4 pb-2 pl-2 font-medium text-white hover:bg-white"
        >
          <Info className="mr-2 text-lg" />
          Icon Legend
        </Link>
      </div>
    </header>
  );
};

export default Header;
