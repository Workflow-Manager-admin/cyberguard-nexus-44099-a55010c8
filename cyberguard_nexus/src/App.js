import React, { useState } from "react";
import "./App.css";
import { ThemeProvider } from "./ThemeProvider";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import AuthPage from "./AuthPage";

/**
 * App entry - provides theme and lays out header, sidebar, and main.
 */
// PUBLIC_INTERFACE
function App() {
  // Track pseudo-auth user state locally for demo (would use context in real app)
  const [user, setUser] = useState(null);

  // Handle fake onboarding redirect
  const [route, setRoute] = useState(() => {
    // Read query hash to choose page ("/login", "/signup"), default to login if unauth, dashboard if auth
    if (window.location.pathname.startsWith("/signup")) return "signup";
    if (window.location.pathname.startsWith("/login")) return "login";
    if (window.location.pathname.startsWith("/onboarding")) return user ? "onboarding" : "login";
    return user ? "dashboard" : "login";
  });

  // Simulate client-side navigation (hash/history)
  const navigate = (to) => {
    window.history.pushState({}, "", to);
    // Recompute route
    if (to.startsWith("/signup")) setRoute("signup");
    else if (to.startsWith("/login")) setRoute("login");
    else if (to.startsWith("/onboarding")) setRoute("onboarding");
    else setRoute("dashboard");
  };

  // Called after login/signup "success"
  const handleAuthSuccess = (u) => {
    setUser(u);
    // Go to onboarding flow after auth
    navigate("/onboarding");
  };

  // Onboarding stub UI
  if (route === "onboarding") {
    return (
      <ThemeProvider>
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background-color)] text-[var(--text-color)]">
          <Header />
          <main className="flex-1 flex flex-col justify-center items-center w-full">
            <div className="bg-[var(--background-navbar)] rounded-xl border border-[var(--border-color)] p-6 shadow-md max-w-lg w-full mt-20 md:mt-32">
              <h2 className="font-bold text-2xl mb-3 text-center">Welcome!</h2>
              <div className="mb-6 text-center text-[var(--text-secondary)]">
                {/* Simplified onboarding wizard placeholder */}
                <p className="mb-3">Thank you for signing up.<br/>Onboarding wizard coming soon (permissions, device selection, etc).</p>
                <button className="btn btn-large mt-3" onClick={() => navigate("/")}>
                  Continue to Dashboard
                </button>
              </div>
            </div>
          </main>
        </div>
      </ThemeProvider>
    );
  }

  // Auth (login/signup) route
  if (route === "login" || route === "signup") {
    return (
      <ThemeProvider>
        <div className="min-h-screen flex flex-col bg-[var(--background-color)]">
          <Header />
          <main className="flex-1 flex justify-center items-center mt-20">
            <AuthPage
              defaultMode={route === "signup" ? "signup" : "login"}
              onAuthSuccess={handleAuthSuccess}
            />
          </main>
        </div>
      </ThemeProvider>
    );
  }

  // Dashboard (default main app view)
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
