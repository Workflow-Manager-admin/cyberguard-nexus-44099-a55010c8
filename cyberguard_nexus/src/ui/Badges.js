import React from "react";
// PUBLIC_INTERFACE
/**
 * Badge component for status/metric highlighting.
 * color - main border+text color, e.g. primary/secondary/accent
 * label - badge text
 * Responsive: text-xs/text-sm scaling, wrap, aria-label
 */
export function Badge({ color = "primary", label, icon, className = "" }) {
  return (
    <span
      className={`inline-flex flex-row items-center gap-1 px-2 xs:px-3 py-0.5 xs:py-1 rounded-full border
        text-[0.72rem] xs:text-xs font-semibold border-${color} text-${color} bg-${color}/10
        whitespace-nowrap ${className}`}
      style={{
        borderColor: `var(--color-${color})`,
        color: `var(--color-${color})`,
        backgroundColor: `rgba(0,255,255,0.1)`
      }}
      role="status"
      aria-label={label}
    >
      {icon ? <span className="text-base xs:text-lg">{icon}</span> : null}
      {label}
    </span>
  );
}
export default Badge;
