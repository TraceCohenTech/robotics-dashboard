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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 font-hud ${
        scrolled ? "bg-[#050a10]/90 backdrop-blur-md border-b border-cyan-500/20" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 h-14 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 text-white">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 pulse-dot" />
            <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-xs sm:text-sm font-bold tracking-[0.15em] uppercase">
            Fleet_Registry<span className="text-cyan-400">.sys</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded text-xs uppercase tracking-widest font-medium text-cyan-100/70 hover:text-cyan-300 hover:bg-cyan-500/10 active:scale-[0.97] transition"
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
          className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded text-cyan-300"
        >
          <span className="sr-only">Menu</span>
          <div className="w-5 space-y-1">
            <div className="h-0.5 w-full bg-cyan-300" />
            <div className="h-0.5 w-full bg-cyan-300" />
            <div className="h-0.5 w-full bg-cyan-300" />
          </div>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#050a10] border-t border-cyan-500/20 px-4 py-3 flex flex-col gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded text-xs uppercase tracking-widest font-medium text-cyan-100/80 hover:bg-cyan-500/10"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
