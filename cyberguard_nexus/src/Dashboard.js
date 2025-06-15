import React, { useState } from "react";
import { Badge } from "./ui/Badges";
import { Card } from "./ui/Cards";
import { ProgressRing } from "./ui/ProgressRing";
import { AlertBanner } from "./ui/AlertBanner";
import DeviceSyncBanner from "./ui/DeviceSyncBanner";
import { motion } from "framer-motion";

/**
 * CyberGuard Nexus Dashboard — Modular, futuristic dashboard with
 * accent color widgets: exposure score, category overview, 30-day chart, alerts,
 * leak summary, privacy tip, using Cards/Badges, Tailwind grid, and Framer Motion.
 * Demo uses only dummy/mock data; replace with real API data in the future.
 */

// --- DUMMY DATA ---

const DIGITAL_EXPOSURE_SCORE = 67; // 0-100 demo
const CATEGORY_OVERVIEW = [
  {
    icon: "📧",
    label: "Email",
    risk: "Low",
    color: "primary",
    value: 4,
    desc: "Known exposures",
  },
  {
    icon: "🤳",
    label: "Social",
    risk: "Medium",
    color: "accent",
    value: 2,
    desc: "Accounts flagged",
  },
  {
    icon: "📱",
    label: "Apps",
    risk: "Low",
    color: "secondary",
    value: 8,
    desc: "Monitored apps",
  },
  {
    icon: "🖥️",
    label: "Device",
    risk: "Optimal",
    color: "primary",
    value: 4,
    desc: "Devices protected",
  },
  {
    icon: "🌐",
    label: "Web",
    risk: "High",
    color: "accent",
    value: 3,
    desc: "Privacy trackers",
  },
];

function getMockTrendData() {
  return Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    score: 60 + Math.round(7 * Math.sin(i / 4) + (Math.random() - 0.5) * 2),
  }));
}
const trendData = getMockTrendData();

const HIGH_RISK_ALERTS = [
  {
    id: 1,
    label: "Credential reuse detected on 2 sites.",
    severity: "danger",
    icon: "⚠️",
  },
  {
    id: 2,
    label: "Impersonation risk: Social profile clone flagged.",
    severity: "warning",
    icon: "🕵️‍♂️",
  },
];

const LEAK_SUMMARY = [
  {
    icon: "🔓",
    label: "Recent Data Leaks",
    count: 1,
    desc: "in last 30 days",
    color: "danger",
  },
  {
    icon: "👤",
    label: "Impersonation Reports",
    count: 1,
    desc: "potential cases",
    color: "accent",
  },
];

const AI_PRIVACY_TIP =
  "Enable two-factor authentication on all accounts for an extra layer of security. Avoid reusing passwords.";

// --- Exposure Trend Chart as Inline SVG ---
function ExposureTrendGraph({ data = [], stroke = "var(--color-accent)", height = 48 }) {
  const width = 140;
  const margin = 6;
  if (!data.length) return null;
  const minScore = Math.min(...data.map(p => p.score));
  const maxScore = Math.max(...data.map(p => p.score));
  const getY = (score) =>
    height - margin - ((score - minScore) / (maxScore - minScore + 0.01)) * (height - 2 * margin);

  const points = data
    .map((p, i) => [
      ((i / (data.length - 1)) * (width - 2 * margin)) + margin,
      getY(p.score),
    ])
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  return (
    <svg width={width} height={height} aria-label="Exposure score trend, last 30 days">
      <defs>
        <linearGradient id="trendGradient" x1="0" y1="0" x2={width} y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-primary)" offset="0%" />
          <stop stopColor="var(--color-accent)" offset="80%" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke="url(#trendGradient)"
        strokeWidth="3.0"
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
        strokeWidth="2"
      />
    </svg>
  );
}

// PUBLIC_INTERFACE
export default function Dashboard() {
  const [alertOpen, setAlertOpen] = useState(true);

  return (
    <div className="flex flex-col items-stretch gap-7 py-0 px-1 w-full max-w-4xl mx-auto">

      {/* Smart Dashboard banner */}
      <AlertBanner
        open={alertOpen}
        type="info"
        message={
          <>
            <span role="img" aria-label="info">🛡️</span>
            <b> CyberGuard Nexus Smart Dashboard</b> — Your privacy, at a glance.
          </>
        }
        onClose={() => setAlertOpen(false)}
      />

      {/* Device Sync (future feature) */}
      <DeviceSyncBanner />

      {/* Main widget grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Digital Exposure Score card/gauge */}
        <div className="md:col-span-4">
          <Card
            title="Digital Exposure Score"
            color={DIGITAL_EXPOSURE_SCORE > 74 ? "secondary" : DIGITAL_EXPOSURE_SCORE > 49 ? "primary" : "accent"}
            icon="🔢"
            footer={
              <Badge
                color={DIGITAL_EXPOSURE_SCORE > 74 ? "secondary" : DIGITAL_EXPOSURE_SCORE > 49 ? "primary" : "accent"}
                label={
                  DIGITAL_EXPOSURE_SCORE >= 80
                    ? "Excellent"
                    : DIGITAL_EXPOSURE_SCORE >= 50
                    ? "Average"
                    : "Action Needed"
                }
                icon={DIGITAL_EXPOSURE_SCORE < 50 ? "⚠️" : "✔️"}
              />
            }
          >
            <div className="flex flex-col items-center justify-center my-2">
              <ProgressRing
                percent={DIGITAL_EXPOSURE_SCORE}
                color={DIGITAL_EXPOSURE_SCORE > 74 ? "secondary" : DIGITAL_EXPOSURE_SCORE > 49 ? "primary" : "accent"}
                size={72}
                stroke={8}
              >
                <span className="text-xl font-bold">{DIGITAL_EXPOSURE_SCORE}</span>
              </ProgressRing>
              <div className="text-xs mt-2 text-[var(--text-secondary)] text-center">
                {DIGITAL_EXPOSURE_SCORE >= 80
                  ? "Low exposure, keep it up!"
                  : DIGITAL_EXPOSURE_SCORE >= 50
                  ? "Some exposure detected. Review privacy settings."
                  : "High exposure! Take immediate action."}
              </div>
            </div>
          </Card>
        </div>

        {/* Category Overview - Email/Social/Apps/Device/Web */}
        <div className="md:col-span-5 flex flex-col gap-2">
          <Card
            title="Category Overview"
            color="primary"
            icon="🗂️"
            footer={null}
            className="h-full"
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {CATEGORY_OVERVIEW.map((cat, i) => (
                <div key={cat.label} className="flex flex-col items-center p-2">
                  <span
                    className="rounded-lg text-2xl mb-1 inline-block px-2 py-1"
                    style={{
                      color: `var(--color-${cat.color})`,
                      background: `rgba(0,255,255,0.07)`
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
                  <Badge
                    color={cat.color}
                    label={cat.risk}
                    className="mt-1"
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 30-day trend graph widget */}
        <div className="md:col-span-3 flex flex-col">
          <Card
            title="Exposure Trend"
            color="accent"
            icon="📈"
            footer={
              <span className="text-xs text-[var(--text-secondary)]">Past 30 days</span>
            }
          >
            <div className="flex items-center justify-center">
              <ExposureTrendGraph data={trendData} />
            </div>
            <div className="flex justify-between mt-2 text-xs text-[var(--text-secondary)]">
              <span>Start: {trendData[0]?.score}</span>
              <span>Now: {trendData[trendData.length - 1]?.score}</span>
            </div>
          </Card>
        </div>

        {/* High-Risk Alerts list */}
        <div className="md:col-span-7">
          <Card
            title="High-Risk Alerts"
            color="accent"
            icon="⚡"
            footer={null}
          >
            {HIGH_RISK_ALERTS.length === 0 ? (
              <div className="text-sm text-green-400">No high-risk alerts. 🎉</div>
            ) : (
              <div className="flex flex-col gap-2">
                {HIGH_RISK_ALERTS.map(alert => (
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
        </div>

        {/* Leak/impersonation summary & privacy tip */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <Card
            title="Leak & Impersonation Summary"
            color="primary"
            icon="🔒"
            footer={null}
          >
            <div className="grid grid-cols-2 gap-2">
              {LEAK_SUMMARY.map(ls => (
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
            title="AI Privacy Tip"
            color="secondary"
            icon="🤖"
            footer={<span className="text-xs text-[var(--text-secondary)]">AI-generated for you</span>}
          >
            <motion.div
              initial={{opacity: 0, y: 8}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.38, type: "spring"}}
              className="flex gap-2 items-start"
            >
              <span className="text-lg">💡</span>
              <span className="text-sm">{AI_PRIVACY_TIP}</span>
            </motion.div>
          </Card>
        </div>
      </div>
    </div>
  );
}
