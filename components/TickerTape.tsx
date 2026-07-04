"use client";
import { COMPANIES } from "@/app/data";

export function TickerTape() {
  const entries = COMPANIES.map((c) => ({ name: c.robot, color: c.color }));
  const doubled = [...entries, ...entries];
  return (
    <div className="overflow-hidden py-3 relative font-data">
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#1a1410] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#1a1410] to-transparent z-10 pointer-events-none" />
      <div className="marquee-track flex gap-2 w-max">
        {doubled.map((b, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded border whitespace-nowrap text-xs sm:text-sm font-medium"
            style={{ borderColor: `${b.color}66`, color: b.color, background: `${b.color}1a` }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: b.color }} aria-hidden="true" />
            {b.name}
          </div>
        ))}
      </div>
    </div>
  );
}
