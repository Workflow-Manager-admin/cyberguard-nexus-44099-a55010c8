import React from "react";
import { useTheme } from "./ThemeProvider";

// PUBLIC_INTERFACE
/**
 * Header component - branded, responsive, includes theme toggle.
 */
export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="w-full bg-[var(--background-navbar)] border-b border-[var(--border-color)] flex items-center justify-between px-2 xs:px-3 sm:px-4 md:px-8 h-16 fixed top-0 left-0 z-30 transition-colors"
      role="banner"
      tabIndex={0}
      aria-label="Site navigation and branding"
    >
      <div className="flex items-center gap-2 xs:gap-3 select-none min-w-0">
        <span className="text-2xl text-primary font-bold tracking-tight">*</span>
        <span className="font-semibold truncate text-base xs:text-lg md:text-xl tracking-wide">
          <span className="hidden sm:inline">CyberGuard Nexus</span>
          <span className="sm:hidden">CG Nexus</span>
        </span>
      </div>
      <div className="flex items-center space-x-2 xs:space-x-4">
        {/* Dark/light mode toggle button with accessibility/focus polish */}
        <button
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggleTheme}
          className="rounded p-2 border border-[var(--border-color)] bg-transparent
            hover:bg-[var(--border-color)] focus:ring-2 focus:ring-primary
            focus:outline-none transition aria-pressed"
          tabIndex={0}
        >
          {theme === "dark" ? (
            <span role="img" aria-label="Switch to light mode" className="text-xl">
              🌞
            </span>
          ) : (
            <span role="img" aria-label="Switch to dark mode" className="text-xl">
              🌜
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
