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
            <section className="mb-10 mt-8">
              <div className="flex flex-col gap-2 text-center">
                <div className="text-secondary font-medium tracking-wide text-lg mb-2">AI Workflow Manager Template</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">cyberguard_nexus</h1>
                <div className="text-base md:text-lg text-[var(--text-secondary)] mb-4">
                  Start building your application.
                </div>
                <button className="btn btn-large w-fit mx-auto">Button</button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
