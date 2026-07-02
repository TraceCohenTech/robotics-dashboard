"use client";
import {
  Bot,
  Building2,
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
  MARKET_BREAKDOWN,
  VALUATION_CHART,
  type Robotics,
} from "./data";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { Nav } from "@/components/Nav";
import { LogoWall } from "@/components/LogoWall";

const MARKET_ICON: Record<string, any> = {
  Home,
  Industrial: Factory,
  Logistics: Building2,
  Healthcare: HeartPulse,
  "Broad / Research": Globe2,
};

const fmtM = (v: number) => (v >= 1000 ? `$${(v / 1000).toFixed(1)}B` : `$${v}M`);

// Scatter: funding ($M) vs valuation ($M), bubble size = years since founding
const MATRIX_DATA = COMPANIES.filter((c) => c.totalFunding > 0).map((c) => ({
  x: c.totalFunding,
  y: c.valuation || 0,
  z: 2026 - c.founded,
  name: c.name,
  color: c.color,
}));

export default function Page() {
  return (
    <div id="top" className="min-h-screen text-slate-900">
      <Nav />

      {/* HERO */}
      <header className="relative overflow-hidden bg-slate-950 text-white pt-24 sm:pt-28 pb-16 sm:pb-24">
        <div className="mesh-bg" aria-hidden>
          <div className="mesh-blob-3" />
        </div>
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 text-xs font-semibold text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 pulse-dot" />
                  <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Landscape as of {COMPANY.asOf}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
                <Bot className="h-3 w-3" aria-hidden="true" /> 11 companies tracked
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              The humanoid robot
              <br />
              <span className="text-cyan-300">gold rush.</span>
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-5 text-base sm:text-xl text-blue-100/85 max-w-3xl leading-relaxed">
              From Figure AI&apos;s $39B valuation to a $7,999 laundry-folder from Weave — general-purpose
              robotics has split into home, industrial, logistics, and healthcare bets, all racing to
              put a humanoid body around the same generation of foundation models.
              <span className="text-white font-semibold"> Over $4B raised, $53B+ in disclosed valuation.</span>
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Reveal delay={300}>
              <HeroStat
                label="Total venture funding"
                value={<>$<CountUp to={4.26} decimals={2} />B</>}
                sub="across venture-backed players"
                color="#22d3ee"
              />
            </Reveal>
            <Reveal delay={380}>
              <HeroStat
                label="Combined valuation"
                value={<>$<CountUp to={53.2} decimals={1} />B</>}
                sub="disclosed, venture-backed only"
                color="#34d399"
              />
            </Reveal>
            <Reveal delay={460}>
              <HeroStat
                label="Highest valuation"
                value={<>$<CountUp to={39} />B</>}
                sub="Figure AI, Sep 2025 Series C"
                color="#fb923c"
              />
            </Reveal>
            <Reveal delay={540}>
              <HeroStat
                label="Companies tracked"
                value={<CountUp to={11} />}
                sub="from Boston Dynamics to Weave"
                color="#facc15"
              />
            </Reveal>
          </div>
        </div>
      </header>

      {/* Logo wall marquee */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1600px]">
          <div className="px-4 sm:px-6 pt-6">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">
              11 companies · 11 flagship robots · one race
            </div>
          </div>
          <LogoWall />
        </div>
      </section>

      <main className="mx-auto max-w-[1600px] px-4 sm:px-6 py-12 sm:py-20 space-y-16 sm:space-y-24">
        {/* AT A GLANCE */}
        <Reveal>
          <section id="landscape" className="scroll-mt-20">
            <SectionTitle eyebrow="At a glance" title="Who's building what" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {MARKET_BREAKDOWN.map((m) => {
                const Icon = MARKET_ICON[m.market] || Bot;
                return (
                  <div
                    key={m.market}
                    className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div
                      className="h-8 w-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${m.color}1a` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: m.color }} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">{m.market}</div>
                      <div className="text-xl sm:text-3xl font-bold text-slate-900 mt-0.5">
                        {m.count}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* FUNDING + VALUATION */}
        <section id="funding" className="scroll-mt-20">
          <Reveal>
            <SectionTitle
              eyebrow="Capital"
              title="Funding vs. valuation — the gap tells the story"
              sub="Figure AI has raised the most and commands the highest valuation. But Apptronik and Agility show far higher valuation-to-funding multiples — the market is pricing in OEM deals, not just cash raised. Boston Dynamics and Tesla Optimus are excluded — both are internally funded subsidiaries with no disclosed standalone figures."
            />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Reveal delay={100}>
              <Card>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Total funding raised</h3>
                    <p className="text-xs text-slate-500">$ millions, venture-backed companies</p>
                  </div>
                </div>
                <div
                  role="img"
                  aria-label="Bar chart of total funding raised by robotics company, in millions of dollars"
                  className="h-[280px] sm:h-[380px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={FUNDING_CHART}
                      layout="vertical"
                      margin={{ top: 8, right: 24, left: 8, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                      <XAxis type="number" tick={{ fill: "#475569", fontSize: 11 }} tickFormatter={(v) => fmtM(v)} />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={110}
                        tick={{ fill: "#475569", fontSize: 11 }}
                      />
                      <Tooltip
                        contentStyle={{ background: "#0f172a", border: "none", borderRadius: 8, color: "#fff" }}
                        formatter={(v: number) => [fmtM(v), "Total funding"]}
                        labelStyle={{ color: "#94a3b8" }}
                      />
                      <Bar dataKey="funding" radius={[0, 8, 8, 0]}>
                        {FUNDING_CHART.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={200}>
              <Card>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Latest disclosed valuation</h3>
                    <p className="text-xs text-slate-500">$ millions, most recent round</p>
                  </div>
                </div>
                <div
                  role="img"
                  aria-label="Bar chart of latest disclosed valuation by robotics company, in millions of dollars"
                  className="h-[280px] sm:h-[380px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={VALUATION_CHART}
                      layout="vertical"
                      margin={{ top: 8, right: 24, left: 8, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                      <XAxis type="number" tick={{ fill: "#475569", fontSize: 11 }} tickFormatter={(v) => fmtM(v)} />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={110}
                        tick={{ fill: "#475569", fontSize: 11 }}
                      />
                      <Tooltip
                        contentStyle={{ background: "#0f172a", border: "none", borderRadius: 8, color: "#fff" }}
                        formatter={(v: number) => [fmtM(v), "Valuation"]}
                        labelStyle={{ color: "#94a3b8" }}
                      />
                      <Bar dataKey="valuation" radius={[0, 8, 8, 0]}>
                        {VALUATION_CHART.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* COMPANY PROFILES */}
        <section id="companies" className="scroll-mt-20">
          <Reveal>
            <SectionTitle
              eyebrow="The players"
              title="11 companies, 11 bets on what a robot body is for"
              sub="Sorted by disclosed valuation, then funding. Subsidiaries (Boston Dynamics, Tesla) and pre-valuation acquisitions (Fauna, Weave) show their status instead of a dollar figure."
            />
          </Reveal>
          <Reveal delay={150}>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {[...COMPANIES]
                .sort((a, b) => b.valuation - a.valuation || b.totalFunding - a.totalFunding)
                .map((c) => (
                  <CompanyCard key={c.slug} c={c} />
                ))}
            </div>
          </Reveal>
        </section>

        {/* SPECS TABLE */}
        <section id="specs" className="scroll-mt-20">
          <Reveal>
            <SectionTitle
              eyebrow="Hardware"
              title="Robot specs, side by side"
              sub="Not every company publishes a full spec sheet — dashes mean the figure isn't public. Confidence flags call out numbers that conflicted across sources during research."
            />
          </Reveal>
          <Reveal delay={150}>
            <Card>
              <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                <table className="w-full min-w-[900px] text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500">
                      <th className="py-2 pr-3">Company</th>
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
                    {COMPANIES.map((c) => (
                      <tr key={c.slug} className="border-b border-slate-100">
                        <td className="py-3 pr-3">
                          <div className="flex items-center gap-2">
                            <span
                              className="h-2 w-2 rounded-full flex-shrink-0"
                              style={{ background: c.color }}
                              aria-hidden="true"
                            />
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
            </Card>
          </Reveal>
        </section>

        {/* POSITIONING MATRIX */}
        <section id="matrix" className="scroll-mt-20">
          <Reveal>
            <SectionTitle
              eyebrow="Positioning"
              title="Funding vs. valuation multiple"
              sub="Bubble size = years since founding. Companies with a high valuation relative to funding are being priced on future contracts, not just cash raised."
            />
          </Reveal>
          <Reveal delay={150}>
            <Card>
              <div
                role="img"
                aria-label="Scatter plot of robotics companies by total funding raised versus valuation, bubble size representing company age"
                className="h-[360px] sm:h-[440px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      type="number"
                      dataKey="x"
                      name="Funding"
                      tick={{ fill: "#475569", fontSize: 11 }}
                      tickFormatter={(v) => fmtM(v)}
                      label={{ value: "Total funding raised", position: "insideBottom", offset: -4, fill: "#475569", fontSize: 12 }}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      name="Valuation"
                      tick={{ fill: "#475569", fontSize: 11 }}
                      tickFormatter={(v) => fmtM(v)}
                      label={{ value: "Valuation", angle: -90, position: "insideLeft", fill: "#475569", fontSize: 12 }}
                    />
                    <ZAxis type="number" dataKey="z" range={[100, 900]} />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;
                        const d: any = payload[0].payload;
                        return (
                          <div className="rounded-lg bg-slate-900 text-white px-3 py-2 text-xs">
                            <div className="font-bold mb-1">{d.name}</div>
                            <div>Funding: {fmtM(d.x)}</div>
                            <div>Valuation: {fmtM(d.y)}</div>
                            <div className="text-slate-400">{d.z} yrs old</div>
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
              <div className="mt-4 flex flex-wrap gap-2">
                {MATRIX_DATA.map((d) => (
                  <span
                    key={d.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-600"
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: d.color }} aria-hidden="true" />
                    {d.name}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>
        </section>

        {/* Closing */}
        <Reveal>
          <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 sm:p-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-50" />
            <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-blue-600/30 blur-3xl" />
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
              <div className="lg:col-span-3">
                <div className="text-xs uppercase tracking-[0.25em] text-cyan-300 font-bold mb-3">
                  The takeaway
                </div>
                <p className="text-xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  Home robots are cheap to build and hard to sell.
                  <span className="text-cyan-300"> Industrial robots are the opposite.</span>
                </p>
                <p className="mt-4 text-sm sm:text-base text-blue-100/85 max-w-xl leading-relaxed">
                  The highest valuations — Figure AI, Apptronik, Agility — all chase factory and
                  warehouse contracts with a clear ROI case. Home-robotics bets (1X, Sunday, Weave, Fauna)
                  are earlier, cheaper, and betting the market shows up before the hardware does.
                </p>
              </div>
              <div className="lg:col-span-2 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/10 backdrop-blur border border-white/20 p-4">
                  <div className="text-xs text-blue-200 uppercase tracking-wider font-semibold">Industrial avg. valuation</div>
                  <div className="text-3xl sm:text-4xl font-bold text-white mt-1">$15.6B</div>
                  <div className="text-xs text-blue-100 mt-1">Figure, Apptronik, Agility</div>
                </div>
                <div className="rounded-xl bg-white/10 backdrop-blur border border-white/20 p-4">
                  <div className="text-xs text-blue-200 uppercase tracking-wider font-semibold">Home avg. valuation</div>
                  <div className="text-3xl sm:text-4xl font-bold text-cyan-300 mt-1">$985M</div>
                  <div className="text-xs text-blue-100 mt-1">1X, Sunday (disclosed only)</div>
                </div>
                <div className="rounded-xl bg-white/10 backdrop-blur border border-white/20 p-4">
                  <div className="text-xs text-blue-200 uppercase tracking-wider font-semibold">Newest entrants</div>
                  <div className="text-3xl sm:text-4xl font-bold text-white mt-1">3</div>
                  <div className="text-xs text-blue-100 mt-1">founded 2024: Fauna, Sunday, Weave</div>
                </div>
                <div className="rounded-xl bg-white/10 backdrop-blur border border-white/20 p-4">
                  <div className="text-xs text-blue-200 uppercase tracking-wider font-semibold">Already acquired</div>
                  <div className="text-3xl sm:text-4xl font-bold text-cyan-300 mt-1">1</div>
                  <div className="text-xs text-blue-100 mt-1">Fauna → Amazon, Mar 2026</div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </main>

      <footer className="border-t border-slate-200 bg-white py-10 mt-12">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 text-center">
          <p className="text-sm text-slate-600 mb-3">
            Compiled from public funding announcements, company spec sheets, and press coverage as of{" "}
            {COMPANY.asOf}. Figures marked uncertain in the specs table had conflicting sources — treat as
            directional, not exact. Not investment advice.
          </p>
          <p className="text-sm text-slate-500">
            Built by{" "}
            <a
              href="https://x.com/Trace_Cohen"
              target="_blank"
              rel="noopener"
              className="text-blue-600 hover:underline font-semibold"
            >
              @Trace_Cohen
            </a>
            {" · "}
            <a href="mailto:t@nyvp.com" className="text-blue-600 hover:underline font-semibold">
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
        <div className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold mb-2">{eyebrow}</div>
      )}
      <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">{title}</h2>
      {sub && <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl">{sub}</p>}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function HeroStat({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
  color: string;
}) {
  return (
    <div className="glass rounded-2xl p-4 sm:p-5">
      <div className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/70 font-semibold">
        {label}
      </div>
      <div className="text-2xl sm:text-4xl font-bold mt-2" style={{ color }}>
        {value}
      </div>
      {sub && <div className="text-xs text-white/70 mt-1">{sub}</div>}
    </div>
  );
}

function CompanyCard({ c }: { c: Robotics }) {
  const money = (v: number) => (v > 0 ? fmtM(v) : null);
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative flex flex-col">
      <div className="absolute top-0 left-0 h-1 w-full" style={{ background: c.color }} aria-hidden="true" />
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-xl font-bold text-slate-900">{c.name}</div>
          <div className="text-xs text-slate-500">{c.hq} · founded {c.founded}</div>
        </div>
        <span
          className="text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-1 text-white flex-shrink-0"
          style={{ background: c.color }}
        >
          {c.market}
        </span>
      </div>
      <div className="flex items-baseline gap-3 mb-2">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-slate-500">Valuation</div>
          <div className="text-lg font-bold text-slate-900 tabular-nums">
            {money(c.valuation) || <span className="text-slate-400 font-normal">{c.status}</span>}
          </div>
        </div>
        {c.totalFunding > 0 && (
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Raised</div>
            <div className="text-lg font-bold text-slate-700 tabular-nums">{money(c.totalFunding)}</div>
          </div>
        )}
      </div>
      <div className="text-xs text-slate-500 mb-2">
        <span className="font-semibold text-slate-700">{c.robot}</span> · {c.latestRound}
      </div>
      <div className="text-sm text-slate-700 flex-1">{c.differentiator}</div>
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
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${styles[level]}`}>
      {level}
    </span>
  );
}
