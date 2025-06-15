import React, { useState } from "react";
import { Card } from "./ui/Cards";
import { ProgressRing } from "./ui/ProgressRing";
import { Badge } from "./ui/Badges";
import { AlertBanner } from "./ui/AlertBanner";
import DeviceSyncBanner from "./ui/DeviceSyncBanner";
import { motion } from "framer-motion";

/**
 * Dashboard.js
 * Main dashboard UI: Exposure Score gauge, Category Overview, Trend Graph, Alerts, Leak Summary, Privacy Tip.
 * All widgets use modular cards, Tailwind layout, and brand accent colors.
 * No live data: demo/dummy values only.
 */

// --- DUMMY DATA ---

const EXPOSURE_SCORE = 72;
const CATEGORY_OVERVIEW = [
  {
    icon: "📧",
    label: "Email",
    desc: "Known exposures",
    value: 4,
    risk: "Low",
    color: "primary"
  },
  {
    icon: "🤳",
    label: "Social",
    desc: "Accounts flagged",
    value: 2,
    risk: "Medium",
    color: "accent"
  },
  {
    icon: "📱",
    label: "Apps",
    desc: "Monitored apps",
    value: 8,
    risk: "Low",
    color: "secondary"
  },
  {
    icon: "🖥️",
    label: "Device",
    desc: "Devices protected",
    value: 4,
    risk: "Optimal",
    color: "primary"
  },
  {
    icon: "🌐",
    label: "Web",
    desc: "Privacy trackers",
    value: 3,
    risk: "High",
    color: "accent"
  }
];
const getFakeTrendData = () =>
  Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    score: 65 + Math.round(Math.cos(i / 4) * 8 + (Math.random() - 0.5) * 3),
  }));

const HIGH_RISK_ALERTS = [
  {
    id: 1,
    label: "Credential reuse detected on multiple sites.",
    icon: "⚠️",
    severity: "danger"
  },
  {
    id: 2,
    label: "Impersonation risk: Social account clone flagged.",
    icon: "🕵️‍♂️",
    severity: "warning"
  }
];
const LEAKS_SUMMARY = [
  {
    icon: "🔓",
    label: "Recent Data Leaks",
    desc: "in last 30 days",
    count: 1,
    color: "danger"
  },
  {
    icon: "👤",
    label: "Impersonation Reports",
    desc: "potential cases",
    count: 2,
    color: "accent"
  }
];
const PRIVACY_TIP =
  "Enable two-factor authentication on all accounts. Avoid password reuse for maximum safety.";

// --- WIDGET COMPONENTS ---

/** Progress ring/gauge for digital exposure. */
function ExposureScoreWidget({ score }) {
  const color =
    score > 74
      ? "secondary"
      : score > 49
      ? "primary"
      : "accent";
  return (
    <Card
      title="Digital Exposure Score"
      color={color}
      icon="🔢"
      footer={
        <Badge
          color={color}
          label={
            score >= 80 ? "Excellent"
            : score >= 60 ? "Average"
            : "Action Needed"
          }
          icon={score < 60 ? "⚠️" : "✔️"}
        />
      }
    >
      <div className="flex flex-col items-center justify-center my-2">
        <ProgressRing percent={score} color={color} size={78} stroke={8}>
          <span className="text-xl font-bold">{score}</span>
        </ProgressRing>
        <div className="text-xs mt-2 text-[var(--text-secondary)] text-center">
          {score >= 80
            ? "Low exposure, keep it up!"
            : score >= 60
            ? "Some exposure detected. Review privacy settings."
            : "High exposure! Take immediate action."}
        </div>
      </div>
    </Card>
  );
}

/** Cards for each overview category. */
function CategoryOverview() {
  return (
    <Card
      title="Category Overview"
      color="primary"
      icon="🗂️"
      footer={null}
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {CATEGORY_OVERVIEW.map((cat) => (
          <div key={cat.label} className="flex flex-col items-center p-2">
            <span
              className="rounded-lg text-2xl mb-1 inline-block px-2 py-1"
              style={{
                color: `var(--color-${cat.color})`,
                background: "rgba(0,255,255,0.08)",
              }}
              aria-label={cat.label + " icon"}
            >
              {cat.icon}
            </span>
            <span className="font-medium text-xs text-center">{cat.label}</span>
            <span className="font-bold text-lg" style={{ color: `var(--color-${cat.color})` }}>
              {cat.value}
            </span>
            <span className="text-xs text-[var(--text-secondary)] text-center">{cat.desc}</span>
            <Badge color={cat.color} label={cat.risk} className="mt-1" />
          </div>
        ))}
      </div>
    </Card>
  );
}

/** 30-day Exposure trend SVG chart (dummy). */
function TrendChart({ data }) {
  const width = 140;
  const height = 50;
  const margin = 6;
  if (!data.length) return <div className="h-12" />;
  const minScore = Math.min(...data.map((p) => p.score));
  const maxScore = Math.max(...data.map((p) => p.score));
  const getY = (score) =>
    height - margin - ((score - minScore) / (maxScore - minScore + 0.01)) * (height - 2 * margin);
  const points = data
    .map((p, i) =>
      [
        ((i / (data.length - 1)) * (width - 2 * margin)) + margin,
        getY(p.score)
      ].join(",")
    )
    .join(" ");
  return (
    <svg width={width} height={height} aria-label="Exposure score, last 30 days">
      <defs>
        <linearGradient id="trend-gradient" x1="0" y1="0" x2={width} y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-primary)" offset="0%" />
          <stop stopColor="var(--color-accent)" offset="80%" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke="url(#trend-gradient)"
        strokeWidth="3.1"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
      <circle
        cx={width - margin}
        cy={getY(data[data.length - 1]?.score)}
        r={4}
        fill="var(--color-accent)"
        stroke="var(--background-navbar)"
        strokeWidth={2}
      />
    </svg>
  );
}
function TrendWidget() {
  const data = getFakeTrendData();
  return (
    <Card
      title="Exposure Trend"
      color="accent"
      icon="📈"
      footer={<span className="text-xs text-[var(--text-secondary)]">Past 30 days</span>}
    >
      <div className="flex items-center justify-center">
        <TrendChart data={data} />
      </div>
      <div className="flex justify-between mt-2 text-xs text-[var(--text-secondary)]">
        <span>Start: {data[0]?.score}</span>
        <span>Now: {data[data.length - 1]?.score}</span>
      </div>
    </Card>
  );
}

/** High-risk Alert list. */
function AlertsWidget({ alerts }) {
  return (
    <Card title="High-Risk Alerts" color="accent" icon="⚡" footer={null}>
      {alerts.length === 0 ? (
        <div className="text-sm text-green-400">No high-risk alerts. 🎉</div>
      ) : (
        <div className="flex flex-col gap-2">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className={`flex items-center gap-2 rounded px-3 py-2 border-l-4 bg-[var(--background-navbar)]`}
              style={{
                borderColor: alert.severity === "danger"
                  ? "var(--color-accent)"
                  : alert.severity === "warning"
                  ? "var(--color-primary)"
                  : "var(--color-secondary)"
              }}
            >
              <span className="text-lg flex-shrink-0">{alert.icon}</span>
              <span className="text-sm">{alert.label}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

/** Leak & Impersonation cards + AI privacy tip. */
function LeakAndTipWidgets() {
  return (
    <div className="flex flex-col gap-4">
      <Card
        title="Leak & Impersonation Summary"
        color="primary"
        icon="🔒"
        footer={null}
      >
        <div className="grid grid-cols-2 gap-2">
          {LEAKS_SUMMARY.map(ls => (
            <div key={ls.label} className="flex flex-col items-center px-3 py-2">
              <span
                className="text-2xl mb-0.5"
                style={{ color: `var(--color-${ls.color})` }}
              >{ls.icon}</span>
              <span className="font-semibold">{ls.count}</span>
              <span className="text-xs text-[var(--text-secondary)] text-center">
                {ls.label}
              </span>
              <span className="text-[10px] text-[var(--text-secondary)]">{ls.desc}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card
        title="Today's Privacy Tip"
        color="secondary"
        icon="🤖"
        footer={<span className="text-xs text-[var(--text-secondary)]">AI-generated for you</span>}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, type: "spring" }}
          className="flex gap-2 items-start"
        >
          <span className="text-lg">💡</span>
          <span className="text-sm">{PRIVACY_TIP}</span>
        </motion.div>
      </Card>
    </div>
  );
}

// PUBLIC_INTERFACE
function Dashboard() {
  const [bannerOpen, setBannerOpen] = useState(true);

  return (
    <div className="flex flex-col items-stretch gap-7 py-0 px-1 w-full max-w-4xl mx-auto">
      <AlertBanner
        open={bannerOpen}
        type="info"
        message={
          <>
            <span role="img" aria-label="info">🛡️</span>
            <b> CyberGuard Nexus Dashboard</b> — Your privacy, at a glance.
          </>
        }
        onClose={() => setBannerOpen(false)}
      />
      <DeviceSyncBanner />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Exposure score */}
        <div className="md:col-span-4">
          <ExposureScoreWidget score={EXPOSURE_SCORE} />
        </div>
        {/* Category overview */}
        <div className="md:col-span-5 flex flex-col gap-2">
          <CategoryOverview />
        </div>
        {/* 30 day trend */}
        <div className="md:col-span-3 flex flex-col">
          <TrendWidget />
        </div>
        {/* Alerts */}
        <div className="md:col-span-7">
          <AlertsWidget alerts={HIGH_RISK_ALERTS} />
        </div>
        {/* Leak/impersonation summary & tip */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <LeakAndTipWidgets />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
