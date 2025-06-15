import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// PUBLIC_INTERFACE
/**
 * Modal dialog with animated entrance and overlay.
 * open: boolean, onClose: fn, title: string, children
 * Responsive: mobile max-w, proper spacing, focus trap (future), ARIA.
 */
export function Modal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ background: "rgba(24,32,40,0.65)" }}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
        >
          <motion.div
            className="bg-[var(--background-navbar)] rounded-xl border border-[var(--color-primary)]
              p-3 xs:p-4 sm:p-6 w-[92vw] xs:w-[90vw] sm:w-full max-w-xs sm:max-w-md shadow-lg"
            initial={{ scale: 0.95, opacity: 0, y: 32 }}
            animate={{ scale: 1.0, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 32 }}
            transition={{ duration: 0.26, type: "spring" }}
            aria-labelledby="modal-title"
          >
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span className="font-semibold text-lg" id="modal-title">{title}</span>
              <button
                className="rounded border border-[var(--border-color)] px-2 py-1 text-base ml-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
                onClick={onClose}
                aria-label="Close"
                tabIndex={0}
              >
                ×
              </button>
            </div>
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default Modal;
