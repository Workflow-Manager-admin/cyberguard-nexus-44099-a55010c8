import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// PUBLIC_INTERFACE
/**
 * AlertBanner component for notifications.
 * Props: open, type ('info'|'success'|'warning'|'danger'), message, onClose
 */
const colorMap = {
  info: "primary",
  success: "secondary",
  warning: "accent",
  danger: "accent"
};

export function AlertBanner({ open, type = "info", message, onClose }) {
  const c = colorMap[type] || "primary";
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`fixed top-3 left-1/2 -translate-x-1/2 z-40 px-6 py-3 rounded-lg shadow-2xl border font-medium transition-colors bg-[var(--background-navbar)] border-${c} text-${c}`}
          style={{
            borderColor: `var(--color-${c})`,
            color: `var(--color-${c})`,
            backgroundColor: "rgba(10,14,20,0.98)"
          }}
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.38, type: "spring" }}
        >
          <span className="mr-3">{message}</span>
          <button className="ml-4 px-2 rounded border border-[var(--border-color)]" onClick={onClose}>
            Dismiss
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default AlertBanner;
