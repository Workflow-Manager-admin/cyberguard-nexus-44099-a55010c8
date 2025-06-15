import React from "react";

// PUBLIC_INTERFACE
/**
 * Sidebar navigation component (stub links, theme-aware, responsive).
 */
export default function Sidebar() {
  // Replace nav stubs as routes/pages are implemented.
  return (
    <aside
      className="hidden md:flex flex-col h-full w-60 bg-[var(--background-navbar)] border-r border-[var(--border-color)] pt-20 px-3 fixed top-0 left-0 z-20 transition-all"
      aria-label="Sidebar"
    >
      <nav className="flex flex-col gap-2 mt-2">
        <SidebarLink icon="🏠" label="Dashboard" />
        <SidebarLink icon="🔔" label="Alerts" />
        <SidebarLink icon="🛡️" label="Security" />
        <SidebarLink icon="⚙️" label="Settings" />
        <SidebarLink icon="🖥️" label="Devices" />
        {/* Add more links as required */}
      </nav>
    </aside>
  );
}

// PUBLIC_INTERFACE
/**
 * Sidebar link stub component (icon + label).
 */
function SidebarLink({ icon, label }) {
  return (
    <a
      href="#"
      className="flex items-center gap-2 px-3 py-2 rounded hover:bg-primary/15 transition focus:outline-none text-[var(--text-color)]"
      tabIndex="0"
    >
      <span className="text-lg">{icon}</span>
      <span className="font-normal text-base">{label}</span>
    </a>
  );
}
