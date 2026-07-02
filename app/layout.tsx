import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Humanoid Robotics Race — Dashboard",
  description:
    "Funding, valuation, and specs across 11 humanoid robotics companies — Figure AI, Apptronik, Agility Robotics, 1X, Unitree, Boston Dynamics, Tesla Optimus, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
