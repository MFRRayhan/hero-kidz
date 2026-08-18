import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import localFont from "next/font/local";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const mayaboti = localFont({
  src: "../fonts/mayaboti-normal.ttf",
});

export const metadata = {
  title: {
    default: "Hero Kidz",
    template: "%s | Hero Kidz",
  },
  description:
    "Hero Kidz is your trusted online store for quality kids' products, toys, clothing, and more.Hero Kidz is your trusted online store for quality kids' products, toys, clothing, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
