import React from "react";

// PUBLIC_INTERFACE
/**
 * Sidebar navigation component.
 * Responsive: visible desktop, mobile appears as overlay when activated.
 * ARIA: Landmarks, keyboard navigation.
 */
export default function Sidebar() {
  // TODO: For demo, sidebar is always visible on md+. 
  // For mobile, could add a drawer (to do in later steps if mobile nav/drawer desired)
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex flex-col h-full w-60 bg-[var(--background-navbar)] border-r border-[var(--border-color)] pt-20 px-2 sm:px-3 fixed top-0 left-0 z-20 transition-all"
        aria-label="Main sidebar navigation"
        role="navigation"
        tabIndex={0}
      >
        <nav className="flex flex-col gap-2 mt-2">
          <SidebarLink icon="🏠" label="Dashboard" />
          <SidebarLink icon="🔔" label="Alerts" />
          <SidebarLink icon="🛡️" label="Security" />
          <SidebarLink icon="⚙️" label="Settings" />
          <SidebarLink icon="🖥️" label="Devices" />
        </nav>
      </aside>
      {/* Mobile (small screens) - could add nav drawer or top nav here if needed */}
      {/* Placeholder for mobile nav: could expand with overlay menu/drawer */}
      <nav
        className="flex md:hidden fixed bg-[var(--background-navbar)] bottom-0 left-0 w-full z-20 border-t border-[var(--border-color)] py-1 px-2 flex-row items-center justify-around"
        aria-label="Mobile quick navigation"
        role="navigation"
      >
        <SidebarMobileLink icon="🏠" label="Home" />
        <SidebarMobileLink icon="🔔" label="Alerts" />
        <SidebarMobileLink icon="🛡️" label="Sec" />
        <SidebarMobileLink icon="⚙️" label="Set" />
        <SidebarMobileLink icon="🖥️" label="Dev" />
      </nav>
    </>
  );
}

// PUBLIC_INTERFACE
/**
 * Sidebar link stub component (icon + label) - desktop
 */
function SidebarLink({ icon, label }) {
  return (
    <a
      href="#"
      className="flex items-center gap-2 px-3 py-2 rounded hover:bg-primary/15 transition focus:outline-none text-[var(--text-color)] focus-visible:ring-2 focus-visible:ring-primary"
      tabIndex={0}
      aria-label={label}
      role="link"
    >
      <span className="text-lg" aria-hidden="true">{icon}</span>
      <span className="font-normal text-base">{label}</span>
    </a>
  );
}

// PUBLIC_INTERFACE
/**
 * Mobile sidebar link stub (uses round icon button/label)
 */
function SidebarMobileLink({ icon, label }) {
  return (
    <a
      href="#"
      className="flex flex-col items-center gap-0.5 rounded p-1.5 text-[var(--text-color)] hover:bg-primary/10
        transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary text-xs"
      aria-label={label}
      tabIndex={0}
      role="link"
    >
      <span className="text-lg" aria-hidden="true">{icon}</span>
      <span className="font-medium">{label}</span>
    </a>
  );
}
