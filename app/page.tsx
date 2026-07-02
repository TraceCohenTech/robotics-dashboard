"use client";
import { useMemo, useState } from "react";
import {
  Bot,
  Building2,
  Cpu,
  Factory,
  Globe2,
  Home,
  HeartPulse,
  Radar as RadarIcon,
  Signal,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import {
  COMPANIES,
  COMPANY,
  FUNDING_CHART,
  HERO_STATS,
  MARKET_BREAKDOWN,
  MARKETS,
  VALUATION_CHART,
  type Market,
  type Robotics,
} from "./data";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { Nav } from "@/components/Nav";
import { TickerTape } from "@/components/TickerTape";

const MARKET_ICON: Record<Market, any> = {
  Home,
  Industrial: Factory,
  Logistics: Building2,
  Healthcare: HeartPulse,
  "Broad / Research": Globe2,
  "Foundation Models": Cpu,
};

const fmtM = (v: number) => (v >= 1000 ? `$${(v / 1000).toFixed(1)}B` : `$${v}M`);

const MATRIX_DATA = COMPANIES.filter((c) => c.totalFunding > 0).map((c) => ({
  x: c.totalFunding,
  y: c.valuation || 0,
  z: 2026 - c.founded,
  name: c.name,
  color: c.color,
}));

export default function Page() {
  const [filter, setFilter] = useState<Market | "All">("All");
  const filtered = useMemo(
    () => (filter === "All" ? COMPANIES : COMPANIES.filter((c) => c.market === filter)),
    [filter]
  );

  return (
    <div id="top" className="min-h-screen bg-[#050a10] text-slate-100">
      <Nav />

      {/* HERO — boot sequence console */}
      <header className="relative overflow-hidden pt-24 sm:pt-28 pb-16 sm:pb-20 border-b border-cyan-500/10">
        <div className="absolute inset-0 blueprint-grid" aria-hidden="true" />
        <div className="scan-sweep" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 mb-6 font-hud text-xs">
              <span className="inline-flex items-center gap-2 rounded border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-emerald-300 uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 pulse-dot" />
                  <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Registry online · {COMPANY.asOf}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-cyan-300 uppercase tracking-widest">
                <Bot className="h-3 w-3" aria-hidden="true" /> {HERO_STATS.companiesTracked} units tracked
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white">
              <span className="font-hud text-cyan-400 text-lg sm:text-2xl align-middle mr-2">&gt;</span>
              Humanoid fleet
              <br />
              <span className="text-cyan-300">capital scan.</span>
              <span className="font-hud text-cyan-400 cursor-blink">_</span>
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-5 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
              {HERO_STATS.companiesTracked} VC-backed and internally-funded robotics operators — hardware
              humanoids, warehouse arms, and the foundation-model labs building their brains.
              <span className="text-white font-semibold"> {fmtM(HERO_STATS.totalFunding)} raised, {fmtM(HERO_STATS.totalValuation)} in disclosed valuation.</span>
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Reveal delay={300}>
              <HeroStat label="Total funding raised" value={<>$<CountUp to={HERO_STATS.totalFunding / 1000} decimals={2} />B</>} sub="across all tracked operators" color="#22d3ee" bars={7} />
            </Reveal>
            <Reveal delay={380}>
              <HeroStat label="Combined valuation" value={<>$<CountUp to={HERO_STATS.totalValuation / 1000} decimals={1} />B</>} sub="disclosed rounds only" color="#4ade80" bars={9} />
            </Reveal>
            <Reveal delay={460}>
              <HeroStat label="Highest valuation" value={<>$<CountUp to={HERO_STATS.highestValuation / 1000} />B</>} sub={HERO_STATS.highestValuationCompany} color="#fb923c" bars={10} />
            </Reveal>
            <Reveal delay={540}>
              <HeroStat label="Units tracked" value={<CountUp to={HERO_STATS.companiesTracked} />} sub="hardware + foundation models" color="#facc15" bars={6} />
            </Reveal>
          </div>
        </div>
      </header>

      {/* Ticker */}
      <section className="border-b border-cyan-500/10 bg-[#070d14]">
        <div className="mx-auto max-w-[1600px]">
          <div className="px-4 sm:px-6 pt-4 font-hud text-[10px] uppercase tracking-[0.25em] text-cyan-500/60">
            // flagship units on record
          </div>
          <TickerTape />
        </div>
      </section>

      <main className="mx-auto max-w-[1600px] px-4 sm:px-6 py-12 sm:py-20 space-y-16 sm:space-y-24">
        {/* FLEET OVERVIEW + FILTER */}
        <Reveal>
          <section id="fleet" className="scroll-mt-20">
            <SectionTitle eyebrow="01 · Fleet Overview" title="Who's building what" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {MARKET_BREAKDOWN.map((m) => {
                const Icon = MARKET_ICON[m.market];
                const active = filter === m.market;
                return (
                  <button
                    key={m.market}
                    type="button"
                    onClick={() => setFilter(active ? "All" : m.market)}
                    aria-pressed={active}
                    className={`hud-panel rounded-lg p-4 flex flex-col justify-between text-left transition-all active:scale-[0.97] ${
                      active ? "ring-1 ring-cyan-400" : ""
                    }`}
                  >
                    <div className="h-8 w-8 rounded flex items-center justify-center" style={{ background: `${m.color}22` }}>
                      <Icon className="h-4 w-4" style={{ color: m.color }} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-[10px] font-hud uppercase tracking-widest text-slate-400 mt-2">{m.market}</div>
                      <div className="text-xl sm:text-3xl font-bold text-white mt-0.5">{m.count}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs font-hud text-slate-500 uppercase tracking-widest">
              Click a category to filter the roster and spec sheet below · {filter === "All" ? "showing all units" : `filtered: ${filter}`}
            </p>
          </section>
        </Reveal>

        {/* CAPITAL */}
        <section id="capital" className="scroll-mt-20">
          <Reveal>
            <SectionTitle
              eyebrow="02 · Capital"
              title="Funding vs. valuation — the gap tells the story"
              sub="Figure AI has raised the most and commands the highest hardware valuation, but Skild AI and Physical Intelligence — pure software plays with no shipped product — are priced within range of it. Neither Boston Dynamics nor Tesla Optimus disclose standalone figures; both are internally funded subsidiaries."
            />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Reveal delay={100}>
              <div className="hud-panel rounded-lg p-5 sm:p-6">
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-white font-hud uppercase tracking-wide text-sm">Total funding raised</h3>
                  <p className="text-xs text-slate-400">$ millions, all VC-backed operators</p>
                </div>
                <div role="img" aria-label="Bar chart of total funding raised by robotics company, in millions of dollars" className="h-[360px] sm:h-[560px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={FUNDING_CHART} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1c2e38" horizontal={false} />
                      <XAxis type="number" tick={{ fill: "#7dd3fc", fontSize: 10, fontFamily: "monospace" }} tickFormatter={(v) => fmtM(v)} />
                      <YAxis type="category" dataKey="name" width={112} tick={{ fill: "#94a3b8", fontSize: 10, fontFamily: "monospace" }} />
                      <Tooltip
                        contentStyle={{ background: "#0a131c", border: "1px solid #1c2e38", borderRadius: 6, color: "#e6f1f5", fontFamily: "monospace", fontSize: 12 }}
                        formatter={(v: number) => [fmtM(v), "Total funding"]}
                        labelStyle={{ color: "#22d3ee" }}
                        cursor={{ fill: "rgba(34,211,238,0.06)" }}
                      />
                      <Bar dataKey="funding" radius={[0, 4, 4, 0]}>
                        {FUNDING_CHART.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="hud-panel rounded-lg p-5 sm:p-6">
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-white font-hud uppercase tracking-wide text-sm">Latest disclosed valuation</h3>
                  <p className="text-xs text-slate-400">$ millions, most recent round</p>
                </div>
                <div role="img" aria-label="Bar chart of latest disclosed valuation by robotics company, in millions of dollars" className="h-[360px] sm:h-[560px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={VALUATION_CHART} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1c2e38" horizontal={false} />
                      <XAxis type="number" tick={{ fill: "#7dd3fc", fontSize: 10, fontFamily: "monospace" }} tickFormatter={(v) => fmtM(v)} />
                      <YAxis type="category" dataKey="name" width={112} tick={{ fill: "#94a3b8", fontSize: 10, fontFamily: "monospace" }} />
                      <Tooltip
                        contentStyle={{ background: "#0a131c", border: "1px solid #1c2e38", borderRadius: 6, color: "#e6f1f5", fontFamily: "monospace", fontSize: 12 }}
                        formatter={(v: number) => [fmtM(v), "Valuation"]}
                        labelStyle={{ color: "#22d3ee" }}
                        cursor={{ fill: "rgba(34,211,238,0.06)" }}
                      />
                      <Bar dataKey="valuation" radius={[0, 4, 4, 0]}>
                        {VALUATION_CHART.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ROSTER */}
        <section id="roster" className="scroll-mt-20">
          <Reveal>
            <SectionTitle
              eyebrow="03 · Roster"
              title={`${filtered.length} unit${filtered.length === 1 ? "" : "s"} on record`}
              sub="Sorted by disclosed valuation, then funding. Subsidiaries and acqui-hired teams show their status instead of a dollar figure."
            />
          </Reveal>
          <Reveal delay={150}>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {[...filtered]
                .sort((a, b) => b.valuation - a.valuation || b.totalFunding - a.totalFunding)
                .map((c) => (
                  <CompanyCard key={c.slug} c={c} />
                ))}
            </div>
          </Reveal>
        </section>

        {/* SPECS */}
        <section id="specs" className="scroll-mt-20">
          <Reveal>
            <SectionTitle
              eyebrow="04 · Spec Sheet"
              title="Hardware telemetry, side by side"
              sub="Foundation-model labs (Skild AI, Physical Intelligence, Field AI) ship no hardware of their own — n/a is expected there. Dashes mean the figure simply isn't public. Confidence flags call out numbers that conflicted across sources during research."
            />
          </Reveal>
          <Reveal delay={150}>
            <div className="hud-panel-light rounded-lg p-5 sm:p-6">
              <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                <table className="w-full min-w-[900px] text-sm font-hud">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-[10px] uppercase tracking-wider text-slate-500">
                      <th className="py-2 pr-3">Unit</th>
                      <th className="py-2 pr-3">Robot</th>
                      <th className="py-2 pr-3 text-right">Height</th>
                      <th className="py-2 pr-3 text-right">Weight</th>
                      <th className="py-2 pr-3 text-right">Payload</th>
                      <th className="py-2 pr-3 text-right">Battery</th>
                      <th className="py-2 pr-3 text-right">DOF</th>
                      <th className="py-2 pr-3">Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c) => (
                      <tr key={c.slug} className="border-b border-slate-100">
                        <td className="py-3 pr-3">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: c.color }} aria-hidden="true" />
                            <span className="font-bold text-slate-900">{c.name}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-3 text-slate-700">{c.robot}</td>
                        <td className="py-3 pr-3 text-right tabular-nums text-slate-700">{c.height}</td>
                        <td className="py-3 pr-3 text-right tabular-nums text-slate-700">{c.weight}</td>
                        <td className="py-3 pr-3 text-right tabular-nums text-slate-700">{c.payload}</td>
                        <td className="py-3 pr-3 text-right tabular-nums text-slate-700">{c.battery}</td>
                        <td className="py-3 pr-3 text-right tabular-nums text-slate-700">{c.dof}</td>
                        <td className="py-3 pr-3">
                          <ConfidenceBadge level={c.confidence} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </section>

        {/* MATRIX */}
        <section id="matrix" className="scroll-mt-20">
          <Reveal>
            <SectionTitle
              eyebrow="05 · Positioning"
              title="Funding vs. valuation multiple"
              sub="Bubble size = years since founding. Companies with a high valuation relative to funding are being priced on future contracts and model bets, not just cash raised."
            />
          </Reveal>
          <Reveal delay={150}>
            <div className="hud-panel rounded-lg p-5 sm:p-6">
              <div role="img" aria-label="Scatter plot of robotics companies by total funding raised versus valuation, bubble size representing company age" className="h-[360px] sm:h-[440px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1c2e38" />
                    <XAxis
                      type="number"
                      dataKey="x"
                      name="Funding"
                      tick={{ fill: "#7dd3fc", fontSize: 10, fontFamily: "monospace" }}
                      tickFormatter={(v) => fmtM(v)}
                      label={{ value: "Total funding raised", position: "insideBottom", offset: -4, fill: "#7dd3fc", fontSize: 11 }}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      name="Valuation"
                      tick={{ fill: "#7dd3fc", fontSize: 10, fontFamily: "monospace" }}
                      tickFormatter={(v) => fmtM(v)}
                      label={{ value: "Valuation", angle: -90, position: "insideLeft", fill: "#7dd3fc", fontSize: 11 }}
                    />
                    <ZAxis type="number" dataKey="z" range={[80, 800]} />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3", stroke: "#22d3ee" }}
                      content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;
                        const d: any = payload[0].payload;
                        return (
                          <div className="rounded border border-cyan-500/30 bg-[#0a131c] text-slate-100 px-3 py-2 text-xs font-hud">
                            <div className="font-bold mb-1 text-cyan-300">{d.name}</div>
                            <div>Funding: {fmtM(d.x)}</div>
                            <div>Valuation: {fmtM(d.y)}</div>
                            <div className="text-slate-500">{d.z} yrs old</div>
                          </div>
                        );
                      }}
                    />
                    <Scatter data={MATRIX_DATA}>
                      {MATRIX_DATA.map((entry, i) => (
                        <Cell key={i} fill={entry.color} fillOpacity={0.85} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 font-hud">
                {MATRIX_DATA.map((d) => (
                  <span key={d.name} className="inline-flex items-center gap-1.5 rounded border border-cyan-500/20 px-2.5 py-1 text-[11px] text-slate-400">
                    <span className="h-2 w-2 rounded-full" style={{ background: d.color }} aria-hidden="true" />
                    {d.name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* MISSION BRIEF */}
        <Reveal>
          <section className="hud-panel rounded-lg p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute inset-0 blueprint-grid opacity-40" aria-hidden="true" />
            <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
              <div className="lg:col-span-3">
                <div className="text-xs font-hud uppercase tracking-[0.25em] text-cyan-400 font-bold mb-3 flex items-center gap-2">
                  <RadarIcon className="h-3.5 w-3.5" aria-hidden="true" /> Mission brief
                </div>
                <p className="text-xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white">
                  The brain is getting priced separately from the body.
                </p>
                <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                  Skild AI ($14B) and Physical Intelligence (~$11B) command hardware-grade valuations with
                  zero shipped robots — pure bets on foundation models that any humanoid maker could
                  eventually license. Meanwhile Figure AI, Apptronik, and Neura Robotics are proving the
                  hardware side commands its own premium through real OEM contracts.
                </p>
              </div>
              <div className="lg:col-span-2 grid grid-cols-2 gap-3 font-hud">
                <MissionStat label="Foundation-model valuation" value="$25.0B" sub="Skild AI + Physical Intelligence" color="#22d3ee" />
                <MissionStat label="Hardware avg. (top 3)" value="$17.2B" sub="Figure, Neura, Apptronik" color="#4ade80" />
                <MissionStat label="Consolidation events" value="3" sub="Covariant, Diligent, Fauna → acquired" color="#f59e0b" />
                <MissionStat label="China entrants" value="4" sub="Unitree, Galbot, AgiBot, Fourier" color="#ef4444" />
              </div>
            </div>
          </section>
        </Reveal>
      </main>

      <footer className="border-t border-cyan-500/10 py-10 mt-12 font-hud">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 text-center">
          <p className="text-xs text-slate-500 mb-3">
            $ compiled --sources=public-filings,press,spec-sheets --as-of={COMPANY.asOf.replace(" ", "-")}
            <br />
            Figures marked uncertain had conflicting sources across research — treat as directional, not exact. Not investment advice.
          </p>
          <p className="text-xs text-slate-500">
            <a href="https://x.com/Trace_Cohen" target="_blank" rel="noopener" className="text-cyan-400 hover:text-cyan-300 hover:underline font-semibold">
              @Trace_Cohen
            </a>
            {" · "}
            <a href="mailto:t@nyvp.com" className="text-cyan-400 hover:text-cyan-300 hover:underline font-semibold">
              t@nyvp.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Building blocks ---------- */

function SectionTitle({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="mb-6 sm:mb-8">
      {eyebrow && (
        <div className="text-xs font-hud uppercase tracking-[0.2em] text-cyan-400 font-semibold mb-2">{eyebrow}</div>
      )}
      <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">{title}</h2>
      {sub && <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl">{sub}</p>}
    </div>
  );
}

function HeroStat({
  label,
  value,
  sub,
  color,
  bars,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
  color: string;
  bars: number;
}) {
  return (
    <div className="hud-panel rounded-lg p-4 sm:p-5">
      <div className="text-[10px] sm:text-xs font-hud uppercase tracking-[0.15em] text-slate-400 font-semibold flex items-center gap-1.5">
        <Signal className="h-3 w-3" aria-hidden="true" /> {label}
      </div>
      <div className="text-2xl sm:text-4xl font-bold mt-2" style={{ color }}>
        {value}
      </div>
      {sub && <div className="text-xs text-slate-500 mt-1 truncate">{sub}</div>}
      <div className="signal-bar mt-3" style={{ color }} aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className={i < bars ? "lit" : ""} style={{ height: `${30 + i * 7}%` }} />
        ))}
      </div>
    </div>
  );
}

function MissionStat({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="rounded border border-cyan-500/15 bg-black/20 p-4">
      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{label}</div>
      <div className="text-2xl sm:text-3xl font-bold mt-1" style={{ color }}>{value}</div>
      <div className="text-[11px] text-slate-500 mt-1">{sub}</div>
    </div>
  );
}

function CompanyCard({ c }: { c: Robotics }) {
  const money = (v: number) => (v > 0 ? fmtM(v) : null);
  const Icon = MARKET_ICON[c.market];
  return (
    <div className="hud-panel group rounded-lg p-5 hover:-translate-y-1 transition-transform duration-300 overflow-hidden relative flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded flex items-center justify-center flex-shrink-0" style={{ background: `${c.color}22` }}>
            <Icon className="h-4 w-4" style={{ color: c.color }} aria-hidden="true" />
          </div>
          <div>
            <div className="text-lg font-bold text-white leading-tight">{c.name}</div>
            <div className="text-[11px] font-hud text-slate-500">{c.hq} · est. {c.founded}</div>
          </div>
        </div>
        <span
          className="text-[9px] font-hud font-bold uppercase tracking-wider rounded px-2 py-1 text-black flex-shrink-0"
          style={{ background: c.color }}
        >
          {c.market}
        </span>
      </div>
      <div className="flex items-baseline gap-4 mb-2 font-hud">
        <div>
          <div className="text-[9px] uppercase tracking-wider text-slate-500">Valuation</div>
          <div className="text-base font-bold text-white tabular-nums">
            {money(c.valuation) || <span className="text-slate-500 font-normal text-xs">{c.status}</span>}
          </div>
        </div>
        {c.totalFunding > 0 && (
          <div>
            <div className="text-[9px] uppercase tracking-wider text-slate-500">Raised</div>
            <div className="text-base font-bold text-slate-300 tabular-nums">{money(c.totalFunding)}</div>
          </div>
        )}
      </div>
      <div className="text-[11px] font-hud text-slate-500 mb-2">
        <span className="font-semibold text-slate-300">{c.robot}</span> · {c.latestRound}
      </div>
      <div className="text-sm text-slate-300 flex-1">{c.differentiator}</div>
    </div>
  );
}

function ConfidenceBadge({ level }: { level: "high" | "medium" | "uncertain" }) {
  const styles = {
    high: "bg-emerald-50 text-emerald-700 border-emerald-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    uncertain: "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${styles[level]}`}>
      {level}
    </span>
  );
}
