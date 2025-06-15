import React, { useState } from "react";
import { Badge } from "./ui/Badges";
import { Card } from "./ui/Cards";
import { Slider } from "./ui/Sliders";
import { Timeline } from "./ui/Timeline";
import { Modal } from "./ui/Modal";
import { ProgressRing } from "./ui/ProgressRing";
import { AlertBanner } from "./ui/AlertBanner";
// For animation effects
import { motion } from "framer-motion";

/**
 * Smart dashboard view (main page) for CyberGuard Nexus.
 * Includes compositional demos of all main interactive UI components.
 *
 * Uses ShadCN UI styling primitives and Framer Motion for effects.
 */
// PUBLIC_INTERFACE
const sampleEvents = [
  { label: "Logged In", time: "12:02", status: "done" },
  { label: "Scan Complete", time: "12:04", status: "done" },
  { label: "Device Synced", time: "12:06", status: "active", description: "Awaiting user token..." },
  { label: "Threat Check", status: "todo" }
];

export default function Dashboard() {
  const [sliderVal, setSliderVal] = useState(42);
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(true);
  const [progress, setProgress] = useState(72);

  return (
    <div className="flex flex-col items-stretch gap-7 py-0 px-1 w-full max-w-4xl mx-auto">
      {/* Animated Banner at top */}
      <AlertBanner
        open={alertOpen}
        type="info"
        message={
          <>
            <span role="img" aria-label="info">🛡️</span>
            <b> Welcome to CyberGuard Nexus!</b>—You've entered the future of security dashboards.
          </>
        }
        onClose={() => setAlertOpen(false)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Sample Cards */}
        <Card
          title="Threats Blocked"
          color="primary"
          icon="🚫"
          footer={
            <Badge color="primary" label="+12% this week" />
          }
        >
          <div className="text-2xl font-bold mb-1">78</div>
          <div className="text-xs text-[var(--text-secondary)]">Real-time automatic blocks</div>
        </Card>
        <Card
          title="Devices Synced"
          color="secondary"
          icon="🖥️"
          footer={
            <Badge color="secondary" label="All Secure" icon="🔗" />
          }
        >
          <div className="text-2xl font-bold mb-1">4</div>
          <div className="text-xs text-[var(--text-secondary)]">Fully synched, real-time.</div>
        </Card>
        <Card
          title="System Health"
          color="accent"
          icon="💧"
          footer={
            <Badge color="accent" label="Optimal" />
          }
        >
          <div className="flex items-center gap-4 py-2">
            <ProgressRing percent={progress} color="accent" size={48} />
            <span className="font-semibold">{progress}%</span>
          </div>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          title="User Engagement"
          color="primary"
          icon="🧬"
          footer={
            <Badge color="primary" label="+36 active users" />
          }
        >
          <Slider
            label="Security Sensitivity"
            min={0}
            max={100}
            value={sliderVal}
            onChange={setSliderVal}
            color="primary"
          />
        </Card>

        <Card
          title="Activity Timeline"
          color="secondary"
          icon="⏳"
          footer={
            <button
              className="btn btn-large"
              onClick={() => setModalOpen(true)}
            >
              Show Details
            </button>
          }
        >
          <Timeline events={sampleEvents} color="secondary" />
        </Card>
      </div>

      {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Sync Details">
        <div className="flex flex-col gap-2 my-2">
          <div className="font-medium">Device last activity times:</div>
          <ul className="pl-4 py-1 text-sm">
            <li>• Desktop — 12:06</li>
            <li>• Phone — 11:40</li>
            <li>• Tablet — 10:54</li>
          </ul>
          <div className="text-xs text-[var(--text-secondary)]">
            All devices are online and secure. Last sync: <b>12:07</b>.
          </div>
          <button className="btn mt-2" onClick={() => setModalOpen(false)}>Dismiss</button>
        </div>
      </Modal>
    </div>
  );
}
