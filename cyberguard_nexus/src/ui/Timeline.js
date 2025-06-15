import React from "react";
import { motion } from "framer-motion";

// PUBLIC_INTERFACE
/**
 * Timeline to show a sequence of events/steps.
 * events: [{label, description, time, status}]
 */
export function Timeline({ events = [], color = "primary" }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {events.map((evt, idx) => (
        <motion.div
          key={idx}
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.09, duration: 0.36, type: "spring" }}
        >
          <span
            className={`rounded-full w-4 h-4 border-2 flex-shrink-0 border-${color} bg-[var(--background-color)]`}
            style={{
              borderColor:
                evt.status === "active"
                  ? `var(--color-${color})`
                  : "var(--border-color)",
              background:
                evt.status === "done"
                  ? `var(--color-${color})`
                  : "var(--background-color)"
            }}
          ></span>
          <div className="flex-1">
            <div className="font-semibold text-sm">{evt.label}</div>
            {evt.description && (
              <div className="text-xs text-[var(--text-secondary)]">{evt.description}</div>
            )}
          </div>
          {evt.time && <span className="text-xs text-[var(--text-secondary)]">{evt.time}</span>}
        </motion.div>
      ))}
    </div>
  );
}
export default Timeline;
