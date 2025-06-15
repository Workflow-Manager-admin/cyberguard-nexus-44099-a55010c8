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

  // Ensure the user is redirected and dashboard shown after onboarding
  const [route, setRoute] = useState(() => {
    // Read pathname and user presence to determine route
    if (window.location.pathname.startsWith("/signup")) return "signup";
    if (window.location.pathname.startsWith("/login")) return "login";
    if (window.location.pathname.startsWith("/onboarding")) return user ? "onboarding" : "login";
    return user ? "dashboard" : "login";
  });

  // Navigation function (simulates client-side navigation)
  const navigate = (to) => {
    window.history.pushState({}, "", to);
    // Recompute route
    if (to.startsWith("/signup")) setRoute("signup");
    else if (to.startsWith("/login")) setRoute("login");
    else if (to.startsWith("/onboarding")) setRoute("onboarding");
    else setRoute("dashboard");
  };

  // After login/signup, always go to onboarding next
  const handleAuthSuccess = (u) => {
    setUser(u);
    navigate("/onboarding");
  };

  // Onboarding view: after complete, redirect to Dashboard (route is "dashboard")
  if (route === "onboarding") {
    const OnboardingWizard = require("./OnboardingWizard").default;
    return (
      <ThemeProvider>
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background-color)] text-[var(--text-color)]">
          <Header />
          <main className="flex-1 flex flex-col justify-center items-center w-full">
            <div className="bg-[var(--background-navbar)] rounded-xl border border-[var(--border-color)] p-5 sm:p-7 shadow-md max-w-lg w-full mt-20 md:mt-32">
              <h2 className="font-bold text-2xl mb-2 text-center">Welcome!</h2>
              <div className="mb-2 text-center text-[var(--text-secondary)]">
                Just a couple steps to personalize your experience and maximize your privacy insights.
              </div>
              <OnboardingWizard onComplete={() => {
                // After completing onboarding, always show Dashboard
                navigate("/");
              }} />
            </div>
          </main>
        </div>
      </ThemeProvider>
    );
  }

  // Auth (login/signup) routes
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

  // Always render Dashboard as home/main app view for authenticated users after onboarding
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
