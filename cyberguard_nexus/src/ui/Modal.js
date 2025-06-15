import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// PUBLIC_INTERFACE
/**
 * Modal dialog with animated entrance and overlay.
 * open: boolean, onClose: fn, title: string, children
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
        >
          <motion.div
            className="bg-[var(--background-navbar)] rounded-xl border border-[var(--color-primary)] p-6 w-full max-w-md shadow-lg"
            initial={{ scale: 0.95, opacity: 0, y: 32 }}
            animate={{ scale: 1.0, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 32 }}
            transition={{ duration: 0.26, type: "spring" }}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-lg">{title}</span>
              <button
                className="rounded border border-[var(--border-color)] px-2 py-1 text-base"
                onClick={onClose}
                aria-label="Close"
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
