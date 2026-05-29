"use client";

import { useEffect, useState, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

interface AnalyticsData {
  leads: {
    total: number;
    today: number;
    this_week: number;
    this_month: number;
  };
  bookings: {
    total: number;
    confirmed: number;
    cancelled: number;
    pending: number;
    today: number;
    this_week: number;
  };
  newsletter: {
    total: number;
    active: number;
    inactive: number;
    today: number;
    this_week: number;
    this_month: number;
  };
}

// ─────────────────────────────────────────────────────────
// Animated counter
// ─────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value;
}

// ─────────────────────────────────────────────────────────
// Stat card
// ─────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  accent = false,
  large = false,
}: {
  label: string;
  value: number;
  sub?: string;
  accent?: boolean;
  large?: boolean;
}) {
  const count = useCountUp(value);

  return (
    <div
      className={`relative rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.02] group ${
        accent
          ? "bg-text text-bg border-text"
          : "bg-surface border-border hover:border-accent/40"
      }`}
    >
      <p
        className={`text-xs font-mono uppercase tracking-widest mb-3 ${
          accent ? "text-bg/60" : "text-text-muted"
        }`}
      >
        {label}
      </p>
      <p
        className={`font-black font-display leading-none ${
          large ? "text-6xl" : "text-4xl"
        } ${accent ? "text-bg" : "text-text"}`}
      >
        {count}
      </p>
      {sub && (
        <p
          className={`text-xs mt-3 ${
            accent ? "text-bg/50" : "text-text-muted"
          }`}
        >
          {sub}
        </p>
      )}
      <div
        className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl ${
          accent ? "bg-bg/20" : "bg-accent/40"
        }`}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Section header
// ─────────────────────────────────────────────────────────
function SectionHeader({ title, count }: { title: string; count?: number }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-xs font-mono text-accent uppercase tracking-widest">
        {title}
      </span>
      {count !== undefined && (
        <span className="text-xs font-mono bg-accent/10 text-accent px-2 py-0.5 rounded-full">
          {count} total
        </span>
      )}
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Custom tooltip for charts
// ─────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface border border-border rounded-xl px-4 py-3 text-xs font-mono shadow-lg">
        <p className="text-text-muted mb-1">{label}</p>
        <p className="text-text font-bold text-base">{payload[0].value}</p>
      </div>
    );
  }
  return null;
}

// ─────────────────────────────────────────────────────────
// Main dashboard
// ─────────────────────────────────────────────────────────
export function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchData = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analytics/`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
        setLastUpdated(new Date().toLocaleTimeString());
      })
      .catch(() => {
        setError("Failed to load analytics. Is the backend running?");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-accent animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-text-muted font-mono text-xs uppercase tracking-widest">
          Loading analytics
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-2">
            Error
          </p>
          <p className="text-text font-bold mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="text-xs font-mono text-accent border border-accent/30 px-4 py-2 rounded-full hover:bg-accent/10 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Chart data
  const leadsChartData = [
    { label: "Today", value: data.leads.today },
    { label: "This Week", value: data.leads.this_week },
    { label: "This Month", value: data.leads.this_month },
    { label: "All Time", value: data.leads.total },
  ];

  const bookingsPieData = [
    { name: "Confirmed", value: data.bookings.confirmed },
    { name: "Pending", value: data.bookings.pending },
    { name: "Cancelled", value: data.bookings.cancelled },
  ];

  const newsletterChartData = [
    { label: "Today", value: data.newsletter.today },
    { label: "This Week", value: data.newsletter.this_week },
    { label: "This Month", value: data.newsletter.this_month },
    { label: "All Time", value: data.newsletter.total },
  ];

  const PIE_COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  const conversionRate =
    data.leads.total > 0
      ? ((data.bookings.total / data.leads.total) * 100).toFixed(1)
      : "0";

  return (
    <div className="min-h-screen py-20" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-2">
              APSLOCK / Admin
            </p>
            <h1 className="text-5xl md:text-7xl font-black text-text font-display uppercase tracking-tight leading-none">
              Analytics
            </h1>
          </div>
          <div className="text-right">
            <p className="text-xs font-mono text-text-muted mb-2">
              Last updated: {lastUpdated}
            </p>
            <button
              onClick={fetchData}
              className="text-xs font-mono text-accent border border-accent/30 px-4 py-2 rounded-full hover:bg-accent/10 transition-colors"
            >
              ↻ Refresh
            </button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <StatCard
            label="Total Leads"
            value={data.leads.total}
            sub="All time submissions"
            accent
            large
          />
          <StatCard
            label="Total Bookings"
            value={data.bookings.total}
            sub="Consultation calls"
            large
          />
          <StatCard
            label="Subscribers"
            value={data.newsletter.total}
            sub="Newsletter signups"
            large
          />
          <StatCard
            label="Conversion Rate"
            value={parseFloat(conversionRate)}
            sub="Leads → bookings %"
            large
          />
        </div>

        {/* Leads Section */}
        <div className="mb-16">
          <SectionHeader title="Leads" count={data.leads.total} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-surface border border-border rounded-2xl p-6">
              <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-6">
                Lead Volume
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={leadsChartData} barSize={32}>
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11, fontFamily: "monospace", fill: "var(--text-muted)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--accent)", opacity: 0.05 }} />
                  <Bar dataKey="value" fill="var(--accent)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-rows-3 gap-4">
              <StatCard label="Today" value={data.leads.today} />
              <StatCard label="This Week" value={data.leads.this_week} />
              <StatCard label="This Month" value={data.leads.this_month} />
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="mb-16">
          <SectionHeader title="Bookings" count={data.bookings.total} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col items-center justify-center">
              <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-6 self-start">
                Status Breakdown
              </p>
              <PieChart width={180} height={180}>
                <Pie
                  data={bookingsPieData}
                  cx={90}
                  cy={90}
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {bookingsPieData.map((_, index) => (
                    <Cell key={index} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
              <div className="flex gap-4 mt-4">
                {bookingsPieData.map((entry, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: PIE_COLORS[i] }}
                    />
                    <span className="text-xs font-mono text-text-muted">
                      {entry.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
              <StatCard
                label="Confirmed"
                value={data.bookings.confirmed}
                sub="Active bookings"
                accent
              />
              <StatCard label="Pending" value={data.bookings.pending} />
              <StatCard label="Cancelled" value={data.bookings.cancelled} />
              <StatCard label="Today" value={data.bookings.today} />
              <StatCard label="This Week" value={data.bookings.this_week} />
              <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col justify-center">
                <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-2">
                  Confirm Rate
                </p>
                <p className="text-4xl font-black font-display text-text">
                  {data.bookings.total > 0
                    ? Math.round(
                        (data.bookings.confirmed / data.bookings.total) * 100
                      )
                    : 0}
                  <span className="text-2xl text-text-muted">%</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-16">
          <SectionHeader title="Newsletter" count={data.newsletter.total} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="grid grid-rows-3 gap-4">
              <StatCard
                label="Active"
                value={data.newsletter.active}
                accent
              />
              <StatCard label="Inactive" value={data.newsletter.inactive} />
              <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col justify-center">
                <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-2">
                  Active Rate
                </p>
                <p className="text-4xl font-black font-display text-text">
                  {data.newsletter.total > 0
                    ? Math.round(
                        (data.newsletter.active / data.newsletter.total) * 100
                      )
                    : 0}
                  <span className="text-2xl text-text-muted">%</span>
                </p>
              </div>
            </div>
            <div className="md:col-span-2 bg-surface border border-border rounded-2xl p-6">
              <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-6">
                Subscriber Growth
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={newsletterChartData} barSize={32}>
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11, fontFamily: "monospace", fill: "var(--text-muted)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--accent)", opacity: 0.05 }} />
                  <Bar dataKey="value" fill="var(--text)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border pt-8 flex items-center justify-between">
          <p className="text-xs font-mono text-text-muted">
            APSLOCK Analytics — Internal Use Only
          </p>
          <p className="text-xs font-mono text-text-muted">
            Data from Django + Supabase
          </p>
        </div>

      </div>
    </div>
  );
}
