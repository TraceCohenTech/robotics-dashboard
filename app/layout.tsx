import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fleet Registry — Robotics Capital Scan",
  description:
    "Funding, valuation, and hardware specs across 26 VC-backed robotics and foundation-model operators — Figure AI, Skild AI, Physical Intelligence, Apptronik, Neura Robotics, Unitree, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
