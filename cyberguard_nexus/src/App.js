import React, { useState, useEffect } from "react";
import "./App.css";
import { ThemeProvider } from "./ThemeProvider";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import AuthPage from "./AuthPage";

/**
 * App entry - provides theme and lays out header, sidebar, and main.
 */

// Utility to check location pathname (supports /dashboard and /home as well)
function getRouteFromLocation(user, onboarded) {
  const path = window.location.pathname;
  if (path.startsWith("/signup")) return "signup";
  if (path.startsWith("/login")) return "login";
  if (path.startsWith("/onboarding")) return user ? "onboarding" : "login";
  if (path.startsWith("/dashboard") || path.startsWith("/home")) return user && onboarded ? "dashboard" : "login";
  // Default route
  if (!user) return "login";
  if (!onboarded) return "onboarding";
  return "dashboard";
}

// PUBLIC_INTERFACE
function App() {
  // Track pseudo-auth user state locally for demo (would use context in real app)
  const [user, setUser] = useState(null);
  // Track onboarding status
  const [onboarded, setOnboarded] = useState(false);

  // Route state is computed from (user, onboarded) and pathname.
  const [route, setRoute] = useState(() =>
    getRouteFromLocation(null, false)
  );

  // Listen for history changes, user and onboarding state changes, keep in sync with URL.
  useEffect(() => {
    const onPopState = () => {
      setRoute(getRouteFromLocation(user, onboarded));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [user, onboarded]);

  // When user or onboarding changes, update route if necessary
  useEffect(() => {
    setRoute(getRouteFromLocation(user, onboarded));
    // eslint-disable-next-line
  }, [user, onboarded]);

  // Navigation function - updates history and triggers route recalculation
  const navigate = (to) => {
    if (window.location.pathname !== to) {
      window.history.pushState({}, "", to);
    }
    setRoute(getRouteFromLocation(user, onboarded));
  };

  // After login/signup, always go to onboarding next
  const handleAuthSuccess = (u) => {
    setUser(u);
    setOnboarded(false);
    navigate("/onboarding");
  };

  // After onboarding, mark as complete and go to dashboard
  const handleOnboardingComplete = () => {
    setOnboarded(true);
    navigate("/dashboard");
  };

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

  // Onboarding view only if authenticated but not onboarded
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
              <OnboardingWizard onComplete={handleOnboardingComplete} />
            </div>
          </main>
        </div>
      </ThemeProvider>
    );
  }

  // If user is not authenticated, block dashboard
  if (!user || !onboarded) {
    // Defensive fallback
    navigate("/login");
    return null;
  }

  // Always render Dashboard at /dashboard (or /home) for authenticated users after onboarding
  if (route === "dashboard") {
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

  // Default fallback, redirect
  navigate("/login");
  return null;
}

export default App;
