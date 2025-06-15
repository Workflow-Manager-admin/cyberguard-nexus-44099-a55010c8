import React, { useState } from "react";
import AuthForm from "./AuthForm";

// AUTH UI PAGE: Login/Signup with email/password, Google, Passkey.
// No backend. Redirect to /onboarding after fake "success".

// PUBLIC_INTERFACE
export default function AuthPage({ defaultMode = "login", onAuthSuccess }) {
  const [mode, setMode] = useState(defaultMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Shim: will store email for demo
  // For real app, redirect/session/auth context is needed.

  // PUBLIC_INTERFACE
  /** Handles login/signup logic (fake, no backend) */
  const handleAuth = async ({ email, password }) => {
    setError("");
    setLoading(true);
    // Demo: Simulate backend call and validation
    await new Promise(r => setTimeout(r, 800));
    if (!email.includes("@")) {
      setError("Please use a valid email address.");
      setLoading(false);
      return;
    }
    // Success: transition to onboarding flow
    setLoading(false);
    if (typeof onAuthSuccess === "function") {
      onAuthSuccess({ email }); // user object for later use
    }
  };

  // PUBLIC_INTERFACE
  /** Switch form mode (login/signup) */
  const switchMode = m => {
    setMode(m);
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background-color)] px-2 py-10 md:py-20 transition-all">
      <div className="w-full max-w-md mx-auto">
        <AuthForm
          mode={mode}
          onSubmit={handleAuth}
          oauthOptions={["Google"]}
          passkeyOption={true}
          loading={loading}
          error={error}
          switchMode={switchMode}
        />
      </div>
    </div>
  );
}
