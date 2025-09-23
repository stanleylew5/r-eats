import logo from "@/public/newlogo.webp";
import Image from "next/image";
const Footer = () => {
  return (
    <div className="flex items-center justify-center pb-4 text-center">
      <Image src={logo} alt="logo" className="mx-2 h-8 w-8" />
      <p>2025 R&apos;Eats &copy;</p>
    </div>
  );
};

export default Footer;
