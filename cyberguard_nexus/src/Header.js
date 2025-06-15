import React from "react";
import { useTheme } from "./ThemeProvider";

// PUBLIC_INTERFACE
/**
 * Header component - branded, responsive, includes theme toggle.
 */
export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full bg-[var(--background-navbar)] border-b border-[var(--border-color)] flex items-center justify-between px-4 md:px-8 h-16 fixed top-0 left-0 z-30 transition-colors">
      <div className="flex items-center gap-3 select-none">
        <span className="text-2xl text-primary font-bold tracking-tight">*</span>
        <span className="font-semibold text-lg md:text-xl tracking-wide">
          <span className="hidden sm:inline">CyberGuard Nexus</span>
          <span className="sm:hidden">CG Nexus</span>
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <button
          aria-label="Toggle dark/light mode"
          onClick={toggleTheme}
          className="rounded p-2 border border-[var(--border-color)] bg-transparent hover:bg-[var(--border-color)] transition"
        >
          {theme === "dark" ? (
            <span role="img" aria-label="Light mode" className="text-xl">
              🌞
            </span>
          ) : (
            <span role="img" aria-label="Dark mode" className="text-xl">
              🌜
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
