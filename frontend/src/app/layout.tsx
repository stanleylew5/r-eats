import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";
import { ToastProvider } from "@/context/toast";
import { ToastDisplay } from "@/components/toast-display";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "R'Eats",
  description: "The Better UC Riverside Dining Menu -- Glasgow & Lothian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="dZIG6w9rTI-QTNPNYs8T6vgMZFLnKi3V1Df2QRh_ENI"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          <Header />
          {children}
          <Footer />
          <ToastDisplay />
          <Analytics />
        </ToastProvider>
      </body>
    </html>
  );
}
