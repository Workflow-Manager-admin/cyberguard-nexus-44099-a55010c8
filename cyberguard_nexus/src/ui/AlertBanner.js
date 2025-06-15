import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// PUBLIC_INTERFACE
/**
 * AlertBanner component for notifications (responsive, accessible).
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
          className={`fixed top-2 xs:top-3 left-1/2 -translate-x-1/2 z-40 
            px-3 xs:px-4 sm:px-6 py-2 xs:py-3 rounded-lg shadow-2xl border 
            font-medium text-sm xs:text-base
            transition-colors
            bg-[var(--background-navbar)] border-${c}`}
          style={{
            borderColor: `var(--color-${c})`,
            color: `var(--color-${c})`,
            backgroundColor: "rgba(10,14,20,0.97)"
          }}
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.38, type: "spring" }}
          role="status"
          aria-live="polite"
        >
          {/* Responsive: row to col on mobile if needed */}
          <div className="flex flex-col xs:flex-row items-center xs:items-baseline gap-2 xs:gap-0">
            <span className="mr-0 xs:mr-3">{message}</span>
            <button
              className="ml-0 xs:ml-4 px-2 py-1 text-xs xs:text-sm rounded border border-[var(--border-color)] 
                focus:outline-none focus:ring-2 focus:ring-primary transition"
              onClick={onClose}
              aria-label="Dismiss notification"
              tabIndex={0}
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default AlertBanner;
