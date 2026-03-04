import logo from "@/public/newlogo.webp";
import Image from "next/image";
import Link from "next/link";
import { Info } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200">
      <div className="flex items-center justify-between px-4 py-6 md:px-12">
        <div className="flex items-center">
          <Image src={logo} alt="logo" className="mx-2 h-8 w-8" />
          <p>2025 R&apos;Eats &copy;</p>
        </div>
        <Link
          href="/legend"
          className="hover:text-reats-blue-200 flex items-center justify-center px-4 py-2 transition"
        >
          <Info className="mr-2" />
          Icon Legend
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
