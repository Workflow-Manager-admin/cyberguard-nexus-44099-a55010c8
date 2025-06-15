import React from "react";
import { motion } from "framer-motion";

// PUBLIC_INTERFACE
/**
 * Card base component, can receive children. Animates on mount.
 * Pass color prop for colored border.
 */
export function Card({ title, children, color = "primary", icon, footer, className = "" }) {
  return (
    <motion.div
      className={`shadow-md rounded-xl border p-5 flex flex-col gap-2 bg-[var(--background-navbar)] border-${color} ${className}`}
      style={{
        borderColor: `var(--color-${color})`
      }}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, type: "spring" }}
    >
      <div className="flex items-center gap-3 mb-2">
        {icon && <span className="text-xl">{icon}</span>}
        <span className="font-semibold text-base text-[var(--color-primary)]">{title}</span>
      </div>
      <div className="flex-1">{children}</div>
      {footer && <div className="pt-2">{footer}</div>}
    </motion.div>
  );
}
export default Card;
