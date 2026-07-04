import "./globals.css";
import type { Metadata } from "next";
import { HERO_STATS } from "./data";

export const metadata: Metadata = {
  title: "Field Atlas — A Catalog of Robotics Capital",
  description: `Funding, valuation, and hardware specs across ${HERO_STATS.companiesTracked} VC-backed robotics and foundation-model operators — Figure AI, Skild AI, Physical Intelligence, Apptronik, Neura Robotics, Unitree, and more.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
