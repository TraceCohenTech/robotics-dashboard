"use client";
import { COMPANIES } from "@/app/data";

export function LogoWall() {
  const BRANDS = COMPANIES.map((c) => ({ name: c.robot, color: c.color }));
  const doubled = [...BRANDS, ...BRANDS];
  return (
    <div className="overflow-hidden py-4 relative">
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
      <div className="marquee-track flex gap-3 w-max">
        {doubled.map((b, i) => (
          <div
            key={i}
            className="flex items-center justify-center px-5 sm:px-7 py-3 sm:py-4 rounded-xl text-white font-bold text-sm sm:text-base whitespace-nowrap shadow-md"
            style={{ background: `linear-gradient(135deg, ${b.color} 0%, ${b.color}dd 100%)` }}
          >
            {b.name}
          </div>
        ))}
      </div>
    </div>
  );
}
