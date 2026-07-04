"use client";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#fleet", label: "Fleet" },
  { href: "#capital", label: "Capital" },
  { href: "#roster", label: "Roster" },
  { href: "#specs", label: "Specs" },
  { href: "#matrix", label: "Matrix" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 font-data ${
        scrolled ? "bg-[#f7f3ea]/95 backdrop-blur-md border-b border-[#c9bfa8]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 h-14 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 text-[#1a1410]">
          <span className="text-xs sm:text-sm font-bold tracking-[0.15em] uppercase font-serif-head">
            Fleet Atlas <span className="text-[#0891b2]">No. 001</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded text-xs uppercase tracking-widest font-medium text-[#4a4038] hover:text-[#1a1410] hover:bg-[#e8e0cf] active:scale-[0.97] transition"
            >
              {l.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded text-[#1a1410]"
        >
          <span className="sr-only">Menu</span>
          <div className="w-5 space-y-1">
            <div className="h-0.5 w-full bg-[#1a1410]" />
            <div className="h-0.5 w-full bg-[#1a1410]" />
            <div className="h-0.5 w-full bg-[#1a1410]" />
          </div>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#f7f3ea] border-t border-[#c9bfa8] px-4 py-3 flex flex-col gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded text-xs uppercase tracking-widest font-medium text-[#4a4038] hover:bg-[#e8e0cf]"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
