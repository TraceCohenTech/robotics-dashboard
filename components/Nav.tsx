"use client";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#landscape", label: "Landscape" },
  { href: "#funding", label: "Funding" },
  { href: "#companies", label: "Companies" },
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 h-14 flex items-center justify-between">
        <a href="#top" className={`font-bold text-sm sm:text-base ${scrolled ? "text-slate-900" : "text-white"}`}>
          Humanoid Race <span className="hidden sm:inline opacity-60">· Robotics Dashboard</span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition active:scale-[0.97] ${
                scrolled
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:text-white hover:bg-white/10"
              }`}
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
          className={`md:hidden inline-flex items-center justify-center h-11 w-11 rounded-md ${
            scrolled ? "text-slate-900" : "text-white"
          }`}
        >
          <span className="sr-only">Menu</span>
          <div className="w-5 space-y-1">
            <div className={`h-0.5 w-full ${scrolled ? "bg-slate-900" : "bg-white"}`} />
            <div className={`h-0.5 w-full ${scrolled ? "bg-slate-900" : "bg-white"}`} />
            <div className={`h-0.5 w-full ${scrolled ? "bg-slate-900" : "bg-white"}`} />
          </div>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-3 flex flex-col gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
