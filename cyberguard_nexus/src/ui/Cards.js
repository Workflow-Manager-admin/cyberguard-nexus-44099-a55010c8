import React from "react";
import { motion } from "framer-motion";

// PUBLIC_INTERFACE
/**
 * Card base component, can receive children. Animates on mount.
 * Pass color prop for colored border.
 * Responsive: adjust padding/gap for mobile, min-w/max-w for mobile/desktop.
 */
export function Card({ title, children, color = "primary", icon, footer, className = "" }) {
  return (
    <motion.div
      className={`shadow-md rounded-xl border 
        p-3 xs:p-4 sm:p-5 flex flex-col gap-2 bg-[var(--background-navbar)]
        border-${color} ${className}
        min-w-0 w-full max-w-full
      `}
      style={{
        borderColor: `var(--color-${color})`
      }}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, type: "spring" }}
    >
      <div className="flex items-center gap-2 xs:gap-3 mb-2 overflow-x-auto whitespace-nowrap min-w-0">
        {icon && <span className="text-xl flex-shrink-0">{icon}</span>}
        <span className="font-semibold text-base xs:text-lg text-[var(--color-primary)] truncate">{title}</span>
      </div>
      <div className="flex-1 min-h-0">{children}</div>
      {footer && <div className="pt-2">{footer}</div>}
    </motion.div>
  );
}
export default Card;
