import React, { createContext, useContext, useState, useEffect } from "react";

// PUBLIC_INTERFACE
/**
 * Context for theme management ("dark" or "light").
 */
export const ThemeContext = createContext();

/**
 * ThemeProvider wraps children and manages theme context/state.
 * Applies 'dark' class at <html> root for Tailwind and custom CSS.
 */
// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  // Get system theme once on first load
  const getInitialTheme = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) return stored;
      // Match prefers-color-scheme if present
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Update <html> class and save to localStorage
  useEffect(() => {
    const root = window.document.documentElement; // <html>
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  /**
   * Toggle between "dark" and "light" theme.
   */
  const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));

  // Listen to OS theme preference changes
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = e => {
      setTheme(e.matches ? "dark" : "light");
    };
    mql.addEventListener?.("change", handler);
    return () => {
      mql.removeEventListener?.("change", handler);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// PUBLIC_INTERFACE
/**
 * Use theme context hook.
 */
export function useTheme() {
  return useContext(ThemeContext);
}
