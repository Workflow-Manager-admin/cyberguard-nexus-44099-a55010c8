import React from "react";
import { motion } from "framer-motion";

// PUBLIC_INTERFACE
/**
 * Futuristic slider with label, animated thumb.
 * Props:
 *   value, min, max, step, onChange, label, color
 */
export function Slider({ value, min=0, max=100, step=1, onChange, label, color="primary" }) {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="font-medium text-sm mb-1">
        {label} <span className="ml-2 text-xs text-[var(--text-secondary)]">{value}</span>
      </label>
      <motion.input
        type="range"
        className="w-full slider"
        style={{
          accentColor: `var(--color-${color})`
        }}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={e => onChange(Number(e.target.value))}
        whileFocus={{ scale: 1.02 }}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 220 }}
      />
    </div>
  );
}
export default Slider;
