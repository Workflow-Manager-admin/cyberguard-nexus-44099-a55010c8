import React from "react";
// PUBLIC_INTERFACE
/**
 * Badge component for status/metric highlighting.
 * color - main border+text color, e.g. primary/secondary/accent
 * label - badge text
 */
export function Badge({ color = "primary", label, icon, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-semibold border-${color} text-${color} bg-${color}/10 ${className}`}
      style={{
        borderColor: `var(--color-${color})`,
        color: `var(--color-${color})`,
        backgroundColor: `rgba(0,255,255,0.1)`
      }}
    >
      {icon ? <span className="text-lg">{icon}</span> : null}
      {label}
    </span>
  );
}
export default Badge;
