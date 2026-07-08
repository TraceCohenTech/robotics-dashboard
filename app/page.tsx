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
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  Treemap,
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
  TIMELINE_EVENTS,
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

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

const PLATED = [...COMPANIES].sort((a, b) => b.valuation - a.valuation || b.totalFunding - a.totalFunding);

const VALUED = COMPANIES.filter((c) => c.valuation > 0);

function median(nums: number[]) {
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 !== 0 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

const MEDIAN_FUNDING = median(VALUED.map((c) => c.totalFunding));
const MEDIAN_VALUATION = median(VALUED.map((c) => c.valuation));

const QUADRANT_DATA = VALUED.map((c) => ({
  x: c.totalFunding,
  y: c.valuation,
  z: 2026 - c.founded,
  name: c.name,
  color: c.color,
}));

const TREEMAP_DATA = VALUED.map((c) => ({
  name: c.name,
  size: c.valuation,
  color: c.color,
  market: c.market,
}));

export default function Page() {
  const [filter, setFilter] = useState<Market | "All">("All");
  const filtered = useMemo(
    () => (filter === "All" ? COMPANIES : COMPANIES.filter((c) => c.market === filter)),
    [filter]
  );

  return (
    <div id="top" className="min-h-screen bg-[#f7f3ea] text-[#1a1410]">
      <Nav />

      {/* HERO — dark specimen plate */}
      <header className="relative overflow-hidden pt-24 sm:pt-28 pb-16 sm:pb-20 plate-dark">
        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 mb-6 font-data text-xs">
              <span className="inline-flex items-center gap-2 rounded-sm border border-[#cdc3b0]/40 px-3 py-1 text-[#cdc3b0] uppercase tracking-widest">
                Catalog edition &middot; {COMPANY.asOf}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-sm border border-[#cdc3b0]/40 px-3 py-1 text-[#cdc3b0] uppercase tracking-widest">
                <Bot className="h-3 w-3" aria-hidden="true" /> {HERO_STATS.companiesTracked} specimens catalogued
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3">
                <h1 className="font-serif-head text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-[#f7f3ea]">
                  A field guide to
                  <br />
                  robotics capital.
                </h1>
                <p className="mt-5 text-base sm:text-xl text-[#cdc3b0] max-w-2xl leading-relaxed">
                  {HERO_STATS.companiesTracked} VC-backed and internally-funded robotics operators — hardware
                  humanoids, warehouse arms, and the foundation-model labs building their brains — catalogued
                  like specimens, plated and measured.
                </p>
              </div>
              <div className="lg:col-span-2" aria-hidden="true">
                <RobotArmMark />
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Reveal delay={220}>
              <PlateStat numeral={ROMAN[0]} label="Total funding raised" value={<>$<CountUp to={HERO_STATS.totalFunding / 1000} decimals={2} />B</>} sub="across all catalogued operators" />
            </Reveal>
            <Reveal delay={280}>
              <PlateStat numeral={ROMAN[1]} label="Combined valuation" value={<>$<CountUp to={HERO_STATS.totalValuation / 1000} decimals={1} />B</>} sub="disclosed rounds only" />
            </Reveal>
            <Reveal delay={340}>
              <PlateStat numeral={ROMAN[2]} label="Highest valuation" value={<>$<CountUp to={HERO_STATS.highestValuation / 1000} />B</>} sub={HERO_STATS.highestValuationCompany} />
            </Reveal>
            <Reveal delay={400}>
              <PlateStat numeral={ROMAN[3]} label="Specimens tracked" value={<CountUp to={HERO_STATS.companiesTracked} />} sub="hardware + foundation models" />
            </Reveal>
          </div>
        </div>
      </header>

      {/* Ticker */}
      <section className="border-b border-[#c9bfa8] bg-[#efe9db]">
        <div className="mx-auto max-w-[1600px]">
          <div className="px-4 sm:px-6 pt-4 font-data text-[10px] uppercase tracking-[0.25em] text-[#4a4038]">
            Flagship units on record
          </div>
          <TickerTape />
        </div>
      </section>

      <main className="mx-auto max-w-[1600px] px-4 sm:px-6 py-12 sm:py-20 space-y-16 sm:space-y-24">
        {/* FLEET OVERVIEW + FILTER */}
        <Reveal>
          <section id="fleet" className="scroll-mt-20">
            <SectionTitle eyebrow="Plate I &middot; Fleet Overview" title="Who's building what" />
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
                    aria-label={`Filter by ${m.market}`}
                    className={`plate-card rounded-sm p-4 min-h-[44px] flex flex-col justify-between text-left transition-all hover:-translate-y-0.5 hover:border-[#0891b2] hover:shadow-md active:scale-[0.97] ${
                      active ? "ring-2 ring-[#0891b2]" : ""
                    }`}
                  >
                    <div className="h-8 w-8 rounded-sm flex items-center justify-center" style={{ background: `${m.color}22` }}>
                      <Icon className="h-4 w-4" style={{ color: m.color }} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="font-data text-[10px] uppercase tracking-widest text-[#4a4038] mt-2">{m.market}</div>
                      <div className="text-xl sm:text-3xl font-bold text-[#1a1410] mt-0.5 font-serif-head">{m.count}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs font-data text-[#4a4038] uppercase tracking-widest">
              Click a category to filter the roster and spec sheet below &middot; {filter === "All" ? "showing all specimens" : `filtered: ${filter}`}
            </p>
          </section>
        </Reveal>

        {/* CAPITAL */}
        <section id="capital" className="scroll-mt-20">
          <SectionTitle
            eyebrow="Plate II &middot; Capital"
            title="Funding vs. valuation — the gap tells the story"
            sub="Figure AI has raised the most and commands the highest hardware valuation, but Skild AI, Physical Intelligence, and TARS Robotics — bets on models and seed-stage promise rather than shipped product — are priced within range of it. Boston Dynamics and Tesla Optimus disclose no standalone figures; both are internally funded subsidiaries."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="plate-card rounded-sm p-5 sm:p-6">
              <div className="mb-3">
                <h3 className="font-serif-head text-lg font-bold text-[#1a1410]">Total funding raised</h3>
                <p className="font-data text-xs text-[#4a4038]">$ millions, all VC-backed operators</p>
              </div>
              <div role="img" aria-label="Bar chart of total funding raised by robotics company, in millions of dollars" className="h-[480px] sm:h-[560px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={FUNDING_CHART} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d8cfba" horizontal={false} />
                    <XAxis type="number" tick={{ fill: "#4a4038", fontSize: 10, fontFamily: "ui-monospace, monospace" }} tickFormatter={(v) => fmtM(v)} />
                    <YAxis type="category" dataKey="name" width={112} tick={{ fill: "#4a4038", fontSize: 10, fontFamily: "ui-monospace, monospace" }} />
                    <Tooltip
                      contentStyle={{ background: "#f7f3ea", border: "1px solid #c9bfa8", borderRadius: 2, color: "#1a1410", fontFamily: "ui-monospace, monospace", fontSize: 12 }}
                      formatter={(v: number) => [fmtM(v), "Total funding"]}
                      labelStyle={{ color: "#1a1410", fontWeight: 700 }}
                      cursor={{ fill: "rgba(26,20,16,0.05)" }}
                    />
                    <Bar dataKey="funding" radius={[0, 2, 2, 0]}>
                      {FUNDING_CHART.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="plate-card rounded-sm p-5 sm:p-6">
              <div className="mb-3">
                <h3 className="font-serif-head text-lg font-bold text-[#1a1410]">Latest disclosed valuation</h3>
                <p className="font-data text-xs text-[#4a4038]">$ millions, most recent round</p>
              </div>
              <div role="img" aria-label="Bar chart of latest disclosed valuation by robotics company, in millions of dollars" className="h-[480px] sm:h-[560px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={VALUATION_CHART} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d8cfba" horizontal={false} />
                    <XAxis type="number" tick={{ fill: "#4a4038", fontSize: 10, fontFamily: "ui-monospace, monospace" }} tickFormatter={(v) => fmtM(v)} />
                    <YAxis type="category" dataKey="name" width={112} tick={{ fill: "#4a4038", fontSize: 10, fontFamily: "ui-monospace, monospace" }} />
                    <Tooltip
                      contentStyle={{ background: "#f7f3ea", border: "1px solid #c9bfa8", borderRadius: 2, color: "#1a1410", fontFamily: "ui-monospace, monospace", fontSize: 12 }}
                      formatter={(v: number) => [fmtM(v), "Valuation"]}
                      labelStyle={{ color: "#1a1410", fontWeight: 700 }}
                      cursor={{ fill: "rgba(26,20,16,0.05)" }}
                    />
                    <Bar dataKey="valuation" radius={[0, 2, 2, 0]}>
                      {VALUATION_CHART.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Treemap + donut */}
          <div className="mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="plate-card rounded-sm p-5 sm:p-6 lg:col-span-2">
              <div className="mb-3">
                <h3 className="font-serif-head text-lg font-bold text-[#1a1410]">Relative scale, by valuation</h3>
                <p className="font-data text-xs text-[#4a4038]">Tile area = disclosed valuation, color = market</p>
              </div>
              <div role="img" aria-label="Treemap sized by valuation and colored by market category" className="h-[280px] sm:h-[420px]">
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap
                    data={TREEMAP_DATA}
                    dataKey="size"
                    nameKey="name"
                    stroke="#f7f3ea"
                    fill="#0891b2"
                    content={<TreemapCell />}
                  >
                    <Tooltip
                      contentStyle={{ background: "#f7f3ea", border: "1px solid #c9bfa8", borderRadius: 2, color: "#1a1410", fontFamily: "ui-monospace, monospace", fontSize: 12 }}
                      formatter={(v: number, _n: any, entry: any) => [fmtM(v), entry?.payload?.market ?? "Valuation"]}
                    />
                  </Treemap>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="plate-card rounded-sm p-5 sm:p-6">
              <div className="mb-3">
                <h3 className="font-serif-head text-lg font-bold text-[#1a1410]">Specimen count by market</h3>
                <p className="font-data text-xs text-[#4a4038]">Share of {HERO_STATS.companiesTracked} tracked</p>
              </div>
              <div role="img" aria-label="Donut chart of company count share by market category" className="h-[240px] sm:h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={MARKET_BREAKDOWN}
                      dataKey="count"
                      nameKey="market"
                      innerRadius="55%"
                      outerRadius="85%"
                      paddingAngle={2}
                    >
                      {MARKET_BREAKDOWN.map((entry, i) => (
                        <Cell key={i} fill={entry.color} stroke="#f7f3ea" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: "#f7f3ea", border: "1px solid #c9bfa8", borderRadius: 2, color: "#1a1410", fontFamily: "ui-monospace, monospace", fontSize: 12 }}
                      formatter={(v: number, n: any) => [`${v} companies`, n]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5 font-data text-[10px] text-[#4a4038]">
                {MARKET_BREAKDOWN.map((m) => (
                  <span key={m.market} className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: m.color }} aria-hidden="true" />
                    {m.market} ({m.count})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ROSTER */}
        <section id="roster" className="scroll-mt-20">
          <SectionTitle
            eyebrow="Plate III &middot; Roster"
            title={`${filtered.length} specimen${filtered.length === 1 ? "" : "s"} on record`}
            sub="Sorted by disclosed valuation, then funding. Subsidiaries and acqui-hired teams show their status instead of a dollar figure."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            {[...filtered]
              .sort((a, b) => b.valuation - a.valuation || b.totalFunding - a.totalFunding)
              .map((c) => (
                <SpecimenPlate key={c.slug} c={c} plateNo={PLATED.findIndex((p) => p.slug === c.slug) + 1} />
              ))}
          </div>
        </section>

        {/* SPECS */}
        <section id="specs" className="scroll-mt-20">
          <SectionTitle
            eyebrow="Plate IV &middot; Spec Sheet"
            title="Hardware telemetry, side by side"
            sub="Foundation-model labs (Skild AI, Physical Intelligence, Field AI, Rhoda AI) ship no hardware of their own — n/a is expected there. Dashes mean the figure simply isn't public. Confidence flags call out numbers that conflicted across sources during research."
          />
          <div className="plate-card rounded-sm p-5 sm:p-6">
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full min-w-[900px] text-sm font-data">
                <thead>
                  <tr className="border-b-2 border-[#1a1410] text-left text-[10px] uppercase tracking-wider text-[#4a4038] font-serif-head">
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
                  {filtered.map((c, i) => (
                    <tr key={c.slug} className={`border-b border-[#c9bfa8] ${i % 2 === 1 ? "bg-[#efe9db]/60" : ""}`}>
                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: c.color }} aria-hidden="true" />
                          <span className="font-bold text-[#1a1410]">{c.name}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-3 text-[#4a4038]">{c.robot}</td>
                      <td className="py-3 pr-3 text-right tabular-nums text-[#4a4038]">{c.height}</td>
                      <td className="py-3 pr-3 text-right tabular-nums text-[#4a4038]">{c.weight}</td>
                      <td className="py-3 pr-3 text-right tabular-nums text-[#4a4038]">{c.payload}</td>
                      <td className="py-3 pr-3 text-right tabular-nums text-[#4a4038]">{c.battery}</td>
                      <td className="py-3 pr-3 text-right tabular-nums text-[#4a4038]">{c.dof}</td>
                      <td className="py-3 pr-3">
                        <ConfidenceBadge level={c.confidence} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* MATRIX */}
        <section id="matrix" className="scroll-mt-20">
          <SectionTitle
            eyebrow="Plate V &middot; Positioning"
            title="The positioning quadrant"
            sub="Reference lines mark the median funding and median valuation among companies with a disclosed valuation. Bubble size = years since founding."
          />
          <div className="plate-card rounded-sm p-5 sm:p-6">
            <div role="img" aria-label="Quadrant scatter plot of robotics companies by total funding raised versus valuation, split into four positioning quadrants: Proven Iron, Priced on Promise, Early Days, and Overfunded" className="h-[380px] sm:h-[480px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d8cfba" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Funding"
                    tick={{ fill: "#4a4038", fontSize: 10, fontFamily: "ui-monospace, monospace" }}
                    tickFormatter={(v) => fmtM(v)}
                    label={{ value: "Total funding raised", position: "insideBottom", offset: -4, fill: "#4a4038", fontSize: 11 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Valuation"
                    tick={{ fill: "#4a4038", fontSize: 10, fontFamily: "ui-monospace, monospace" }}
                    tickFormatter={(v) => fmtM(v)}
                    label={{ value: "Valuation", angle: -90, position: "insideLeft", fill: "#4a4038", fontSize: 11 }}
                  />
                  <ZAxis type="number" dataKey="z" range={[80, 800]} />
                  <ReferenceLine x={MEDIAN_FUNDING} stroke="#8a7f68" strokeDasharray="4 4" />
                  <ReferenceLine y={MEDIAN_VALUATION} stroke="#8a7f68" strokeDasharray="4 4" />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3", stroke: "#1a1410" }}
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const d: any = payload[0].payload;
                      return (
                        <div className="rounded-sm border border-[#c9bfa8] bg-[#f7f3ea] text-[#1a1410] px-3 py-2 text-xs font-data">
                          <div className="font-bold mb-1">{d.name}</div>
                          <div>Funding: {fmtM(d.x)}</div>
                          <div>Valuation: {fmtM(d.y)}</div>
                          <div className="text-[#4a4038]">{d.z} yrs old</div>
                        </div>
                      );
                    }}
                  />
                  <Scatter data={QUADRANT_DATA}>
                    {QUADRANT_DATA.map((entry, i) => (
                      <Cell key={i} fill={entry.color} fillOpacity={0.9} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 font-data text-[10px] uppercase tracking-wider text-[#4a4038]">
              <div>&uarr; High valuation / &larr; Low funding: <span className="font-bold text-[#1a1410]">Priced on Promise</span></div>
              <div>&uarr; High valuation / &rarr; High funding: <span className="font-bold text-[#1a1410]">Proven Iron</span></div>
              <div>&darr; Low valuation / &larr; Low funding: <span className="font-bold text-[#1a1410]">Early Days</span></div>
              <div>&darr; Low valuation / &rarr; High funding: <span className="font-bold text-[#1a1410]">Overfunded?</span></div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 font-data">
              {QUADRANT_DATA.map((d) => (
                <span key={d.name} className="inline-flex items-center gap-1.5 rounded-sm border border-[#c9bfa8] px-2.5 py-1 text-[11px] text-[#4a4038]">
                  <span className="h-2 w-2 rounded-full" style={{ background: d.color }} aria-hidden="true" />
                  {d.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section id="timeline" className="scroll-mt-20">
          <SectionTitle
            eyebrow="Plate VI &middot; Timeline"
            title="A year of capital in motion"
            sub="Notable funding rounds, IPO steps, acquisitions, and product launches across the tracked roster, Jul 2025 &ndash; Jul 2026."
          />
          <div className="plate-card rounded-sm p-5 sm:p-6">
            <ol className="relative border-l border-[#c9bfa8] ml-2 sm:ml-3">
              {[...TIMELINE_EVENTS].sort((a, b) => a.date.localeCompare(b.date)).map((e, i) => (
                <li key={i} className="relative pl-6 sm:pl-8 pb-6 last:pb-0">
                  <span
                    className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-[#f7f3ea]"
                    style={{ background: e.color }}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-data">
                    <span className="text-[10px] uppercase tracking-widest text-[#6b6152] font-bold">{e.label}</span>
                    <span className="text-[9px] uppercase tracking-wider rounded-full border border-[#c9bfa8] px-2 py-0.5 text-[#4a4038]">
                      {e.kind}
                    </span>
                  </div>
                  <div className="mt-1 font-serif-head text-base sm:text-lg font-bold text-[#1a1410]">{e.company}</div>
                  <p className="text-sm text-[#4a4038] mt-0.5">{e.event}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* MISSION BRIEF */}
        <section className="plate-dark rounded-sm p-6 sm:p-10 relative overflow-hidden">
          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
            <div className="lg:col-span-3">
              <div className="text-xs font-data uppercase tracking-[0.25em] text-[#cdc3b0] font-bold mb-3">
                Closing note
              </div>
              <p className="font-serif-head text-xl sm:text-3xl lg:text-4xl font-bold leading-tight text-[#f7f3ea]">
                The brain is getting priced separately from the body.
              </p>
              <p className="mt-4 text-sm sm:text-base text-[#cdc3b0] max-w-xl leading-relaxed">
                Skild AI ($14B) and Physical Intelligence (~$11B) command hardware-grade valuations with
                zero shipped robots — pure bets on foundation models that any humanoid maker could
                eventually license. TARS Robotics pushes that logic to its limit: a one-year-old startup
                raising a $513M seed at a $1.9B valuation, priced almost entirely on promise. Meanwhile
                Figure AI, Apptronik, and Neura Robotics are proving the hardware side commands its own
                premium through real OEM contracts.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 gap-3 font-data">
              <MissionStat numeral="I" label="Foundation-model valuation" value="$25.0B" sub="Skild AI + Physical Intelligence" />
              <MissionStat numeral="II" label="Hardware avg. (top 3)" value="$17.2B" sub="Figure, Neura, Apptronik" />
              <MissionStat numeral="III" label="Consolidation events" value="3" sub="Covariant, Diligent, Fauna -> acquired" />
              <MissionStat numeral="IV" label="China entrants" value="7" sub="Unitree, Galbot, AgiBot, Fourier, Robotera, TARS, +" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#c9bfa8] py-10 mt-12 font-data">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 text-center">
          <p className="text-xs text-[#4a4038] mb-3 uppercase tracking-[0.15em]">
            Compiled from public filings, press, and spec sheets &middot; as of {COMPANY.asOf}
            <br />
            Figures marked uncertain had conflicting sources across research — treat as directional, not exact. Not investment advice.
          </p>
          <p className="text-xs text-[#4a4038]">
            <a href="https://x.com/Trace_Cohen" target="_blank" rel="noopener" className="text-[#0e7490] hover:text-[#1a1410] hover:underline font-semibold">
              @Trace_Cohen
            </a>
            {" · "}
            <a href="mailto:t@nyvp.com" className="text-[#0e7490] hover:text-[#1a1410] hover:underline font-semibold">
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
        <div className="font-data text-xs uppercase tracking-[0.2em] text-[#0e7490] font-semibold mb-2">{eyebrow}</div>
      )}
      <h2 className="font-serif-head text-2xl sm:text-4xl font-bold text-[#1a1410] tracking-tight">{title}</h2>
      {sub && <p className="mt-2 text-sm sm:text-base text-[#4a4038] max-w-3xl">{sub}</p>}
      <div className="ruler-rule mt-4" aria-hidden="true" />
    </div>
  );
}

function PlateStat({
  numeral,
  label,
  value,
  sub,
}: {
  numeral: string;
  label: string;
  value: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="plate-dark rounded-sm p-4 sm:p-5">
      <div className="flex items-start justify-between">
        <div className="text-[10px] sm:text-xs font-data uppercase tracking-[0.15em] text-[#cdc3b0] font-semibold">
          {label}
        </div>
        <span className="font-serif-head text-sm text-[#a89a7d]" aria-hidden="true">{numeral}</span>
      </div>
      <div className="font-serif-head text-2xl sm:text-4xl font-bold mt-2 text-[#f7f3ea]">
        {value}
      </div>
      {sub && <div className="font-data text-xs text-[#a89a7d] mt-1 truncate">{sub}</div>}
    </div>
  );
}

function MissionStat({ numeral, label, value, sub }: { numeral: string; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-sm border border-[#3a2f24] bg-black/20 p-4">
      <div className="flex items-start justify-between">
        <div className="text-[10px] uppercase tracking-wider text-[#cdc3b0] font-semibold">{label}</div>
        <span className="font-serif-head text-xs text-[#a89a7d]" aria-hidden="true">{numeral}</span>
      </div>
      <div className="font-serif-head text-2xl sm:text-3xl font-bold mt-1 text-[#f7f3ea]">{value}</div>
      <div className="text-[11px] text-[#a89a7d] mt-1">{sub}</div>
    </div>
  );
}

function SpecimenPlate({ c, plateNo }: { c: Robotics; plateNo: number }) {
  const money = (v: number) => (v > 0 ? fmtM(v) : null);
  return (
    <div className="plate-card group rounded-sm p-5 hover:-translate-y-1 hover:shadow-lg hover:border-[#8a7f68] overflow-hidden relative flex flex-col">
      <div className="flex items-start justify-between mb-2 pb-2 border-b border-[#c9bfa8]">
        <div>
          <div className="font-data text-[10px] uppercase tracking-widest text-[#6b6152]">
            No. {String(plateNo).padStart(2, "0")}
          </div>
          <div className="font-serif-head text-lg font-bold text-[#1a1410] leading-tight">{c.name}</div>
          <div className="font-data text-[11px] text-[#4a4038]">{c.hq} &middot; est. {c.founded}</div>
        </div>
        <span
          className="font-data text-[9px] font-bold uppercase tracking-wider border-b-2 pb-0.5 flex-shrink-0"
          style={{ borderColor: c.color, color: c.color }}
        >
          {c.market}
        </span>
      </div>
      <div className="flex flex-col gap-1 mb-2 font-data text-xs">
        <SpecRow label="Valuation" value={money(c.valuation) ?? c.status} />
        {c.totalFunding > 0 && <SpecRow label="Raised" value={money(c.totalFunding)!} />}
        <SpecRow label="Robot" value={c.robot} />
        <SpecRow label="Founded" value={String(c.founded)} />
      </div>
      <p className="text-sm text-[#4a4038] italic flex-1 mt-1">{c.differentiator}</p>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <span className="uppercase tracking-wider text-[#6b6152] text-[10px]">{label}</span>
      <span className="text-right text-[#1a1410] font-semibold tabular-nums">{value}</span>
    </div>
  );
}

function ConfidenceBadge({ level }: { level: "high" | "medium" | "uncertain" }) {
  const styles = {
    high: "bg-[#dcf5e6] text-[#16653d] border-[#9fdbb8]",
    medium: "bg-[#fdecc8] text-[#8a5a00] border-[#e8c877]",
    uncertain: "bg-[#fbdede] text-[#9b1c1c] border-[#f0b4b4]",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${styles[level]}`}>
      {level}
    </span>
  );
}

function TreemapCell(props: any) {
  const { x, y, width, height, name, color, size } = props;
  if (width < 2 || height < 2) return null;
  const showLabel = width > 60 && height > 28;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} style={{ fill: color, stroke: "#f7f3ea", strokeWidth: 2 }} />
      {showLabel && (
        <text x={x + 6} y={y + 16} fontSize={11} fontFamily="ui-monospace, monospace" fill="#1a1410" fontWeight={700}>
          {name}
        </text>
      )}
      {showLabel && height > 42 && (
        <text x={x + 6} y={y + 30} fontSize={10} fontFamily="ui-monospace, monospace" fill="#1a1410">
          {fmtM(size)}
        </text>
      )}
    </g>
  );
}

function RobotArmMark() {
  return (
    <svg viewBox="0 0 260 200" className="w-full max-w-[320px] mx-auto" role="presentation">
      <g fill="none" stroke="#cdc3b0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="40" cy="170" r="16" />
        <line x1="40" y1="154" x2="40" y2="120" />
        <line x1="40" y1="120" x2="120" y2="90" />
        <circle cx="120" cy="90" r="7" fill="#211a14" />
        <line x1="120" y1="90" x2="190" y2="120" />
        <circle cx="190" cy="120" r="7" fill="#211a14" />
        <line x1="190" y1="120" x2="225" y2="80" />
        <path d="M225 80 L240 65 M225 80 L245 90" />
        <circle cx="60" cy="30" r="18" />
        <line x1="46" y1="20" x2="34" y2="10" />
        <line x1="74" y1="20" x2="86" y2="10" />
      </g>
    </svg>
  );
}
