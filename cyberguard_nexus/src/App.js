import React from "react";
import "./App.css";
import { ThemeProvider } from "./ThemeProvider";
import Header from "./Header";
import Sidebar from "./Sidebar";

/**
 * App entry - provides theme and lays out header, sidebar, and main.
 */
// PUBLIC_INTERFACE
function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-[var(--background-color)] text-[var(--text-color)]">
        <Header />
        <Sidebar />
        <main
          className="flex-1 flex flex-col transition-all mt-16 
          md:ml-60
          px-4 pt-8 pb-8"
        >
          <div className="max-w-3xl mx-auto w-full">
            {/* Dashboard page */}
            <section className="mb-10 mt-8">
              <React.Suspense fallback={<div>Loading Dashboard...</div>}>
                {/* Prefer dynamic import for realistic future codebase, but here we can import directly */}
                {/*
                  import Dashboard from './Dashboard'
                */}
                <div>
                  {/*
                  Below line required: assumes Dashboard.js is created and exports default 
                  */}
                  <Dashboard />
                </div>
              </React.Suspense>
            </section>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
