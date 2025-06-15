import React from "react";
import { motion } from "framer-motion";

// PUBLIC_INTERFACE
/**
 * Progress ring/circle, shows % complete.
 * Props: percent [0..100], color, size (px)
 * Responsive: text scaling, aria-labelled
 */
export function ProgressRing({ percent = 73, color = "primary", size = 72, stroke = 7, children }) {
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.max(0, Math.min(100, percent));
  const dash = (progress / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-label={`Progress: ${progress}%`}
      role="img"
    >
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--border-color)"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`var(--color-${color})`}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dash}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - dash }}
          transition={{ duration: 1.3, type: "spring" }}
        />
      </svg>
      <span
        className="absolute text-[0.95rem] xs:text-md font-bold left-0 right-0 text-center"
        style={{}}
      >
        {children ?? <>{progress}%</>}
      </span>
    </div>
  );
}
export default ProgressRing;
