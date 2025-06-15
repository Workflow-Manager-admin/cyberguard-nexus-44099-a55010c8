import React from "react";
import { motion } from "framer-motion";

// PUBLIC_INTERFACE
/**
 * DeviceSyncBanner - visually prominent, animated skeleton/placeholder
 * for future cross-device synchronization features on the dashboard.
 * Themed to match CyberGuard Nexus: neon, dark-mode, motion, sleek.
 *
 * Usage: Place at the top of Dashboard for strong visual presence.
 */
export function DeviceSyncBanner({ className = "" }) {
  return (
    <motion.div
      className={`w-full mb-3 rounded-2xl border-2 border-primary shadow-md bg-[var(--background-navbar)] 
        px-4 xs:px-7 py-4 xs:py-5 flex flex-col sm:flex-row items-center gap-3 xs:gap-5
        animate-pulse group cursor-default ${className}`}
      style={{
        borderColor: "var(--color-primary)",
        background:
          "linear-gradient(90deg, rgba(10,14,20,0.92) 60%, rgba(0,255,255,0.08) 100%)"
      }}
      initial={{ opacity: 0, scale: 0.97, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      tabIndex={0}
      aria-label="Device synchronization banner, experimental"
    >
      <span className="text-3xl sm:text-4xl text-primary drop-shadow-glow mr-0 sm:mr-5" role="img" aria-hidden="true">
        🔗
      </span>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-lg sm:text-xl tracking-wide text-primary">
          Cross-Device Sync (Soon!)
        </div>
        <div className="mt-0.5 text-sm sm:text-base text-[var(--text-secondary)] leading-snug max-w-2xl">
          <span className="inline-block bg-[var(--color-primary)]/10 rounded px-1.5 py-0.5 mr-1 mb-1 align-middle text-primary font-medium">
            Experimental
          </span>
          Your data and alerts will soon stay seamlessly in sync<br className="hidden xs:inline" />
          across all your devices. <b>More control, more security.</b>
        </div>
      </div>
      {/* Placeholder for animated device icons */}
      <motion.div
        className="flex flex-row gap-2 sm:gap-4 mt-2 sm:mt-0"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <motion.span
          className="text-xl sm:text-2xl"
          variants={{
            rest: { y: 0, scale: 1 },
            hover: { y: -4, scale: 1.08, color: "var(--color-secondary)" }
          }}
          transition={{ type: "spring", stiffness: 320 }}
          role="img"
          aria-label="Desktop"
        >🖥️</motion.span>
        <motion.span
          className="text-xl sm:text-2xl"
          variants={{
            rest: { y: 0, scale: 1 },
            hover: { y: -2, scale: 1.05, color: "var(--color-accent)" }
          }}
          transition={{ type: "spring", stiffness: 260 }}
          role="img"
          aria-label="Tablet"
        >📱</motion.span>
        <motion.span
          className="text-xl sm:text-2xl"
          variants={{
            rest: { y: 0, scale: 1 },
            hover: { y: -6, scale: 1.11, color: "var(--color-primary)" }
          }}
          transition={{ type: "spring", stiffness: 250 }}
          role="img"
          aria-label="Laptop"
        >💻</motion.span>
      </motion.div>
    </motion.div>
  );
}

export default DeviceSyncBanner;
