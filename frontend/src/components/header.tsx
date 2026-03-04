import Image from "next/image";
import logo from "@/public/newlogo.webp";
import Link from "next/link";
import SearchFood from "./search";

const Header = () => {
  return (
    <header className="bg-reats-blue-200">
      <div className="flex items-center justify-between px-4 py-6 md:px-12">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="logo" className="w-[70px]" />
          <p className="ml-2 text-3xl font-semibold text-white">R&apos;Eats</p>
        </Link>
        <SearchFood />
      </div>
    </header>
  );
};

export default Header;
