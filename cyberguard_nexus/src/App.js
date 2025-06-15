import React from "react";
import "./App.css";
import { ThemeProvider } from "./ThemeProvider";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";

/**
 * App entry - provides theme and lays out header, sidebar, and main.
 */
// PUBLIC_INTERFACE
function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col font-sans bg-[var(--background-color)] text-[var(--text-color)]">
        <Header />
        <Sidebar />
        {/* Responsive main layout with accessible landmarks */}
        <main
          id="main-content"
          className="flex-1 flex flex-col transition-all mt-16 md:ml-60
            px-2 xs:px-3 sm:px-4 md:px-8 lg:px-10 py-3 sm:py-6 relative"
          tabIndex={-1}
          aria-label="Content area"
        >
          <div className="w-full max-w-3xl md:max-w-4xl mx-auto">
            {/* Dashboard page (with role region for clarity) */}
            <section
              className="mb-10 mt-4 sm:mt-8"
              aria-label="Dashboard"
              tabIndex={0}
            >
              <React.Suspense fallback={<div>Loading Dashboard...</div>}>
                <Dashboard />
              </React.Suspense>
            </section>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
