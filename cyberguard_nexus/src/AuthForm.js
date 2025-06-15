import React, { useState } from "react";

/**
 * AuthForm component for login/signup.
 * Props:
 *   mode: 'login'|'signup'
 *   onSubmit: function({email, password})
 *   oauthOptions: array of strings, e.g. ['Google']
 *   passkeyOption: boolean, if true, show passkey button
 *   loading: bool, disable form if true
 *   error: string, shows error banner
 *   switchMode: fn, function to switch between login/signup
 */
export default function AuthForm({
  mode,
  onSubmit,
  oauthOptions = [],
  passkeyOption = false,
  loading,
  error,
  switchMode
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Simple email and password validators
  const isEmail = (e) =>
    /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(e.trim());
  const validate = () => ({
    email: !email
      ? "Email is required"
      : !isEmail(email)
      ? "Invalid email"
      : "",
    password: !password
      ? "Password is required"
      : password.length < 6
      ? "Min 6 characters"
      : ""
  });

  const errors = validate();
  const isFormValid = !errors.email && !errors.password;

  // PUBLIC_INTERFACE
  /** Handle form submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!isFormValid || loading) return;
    setSubmitting(true);
    await onSubmit({ email, password });
    setSubmitting(false);
  };

  // PUBLIC_INTERFACE
  /** Handle OAuth login */
  const handleOAuth = (provider) => {
    // This is a stub - hookup real OAuth logic later
    alert(`OAuth (${provider}) not implemented in demo`);
  };

  // PUBLIC_INTERFACE
  /** Handle passkey login/signup */
  const handlePasskey = () => {
    // Passkey stub
    alert("Passkey login/signup not implemented in demo");
  };

  // Accessibility/visuals: aria-live for error, labels, focus ring, show/hide password not included for simplicity
  return (
    <form
      className="w-full max-w-md mx-auto bg-[var(--background-navbar)] border border-[var(--border-color)] rounded-xl shadow-md p-5 flex flex-col gap-4"
      onSubmit={handleSubmit}
      noValidate
      aria-label={mode === "login" ? "Login form" : "Signup form"}
      tabIndex={0}
    >
      <h2 className="font-bold text-2xl text-center mb-1">
        {mode === "login" ? "Sign in to CyberGuard Nexus" : "Sign up for CyberGuard Nexus"}
      </h2>

      {!!error && (
        <div
          className="bg-[#3b2323]/80 border border-red-500/50 rounded px-3 py-2 text-sm text-red-400 mb-1"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}

      <label className="flex flex-col gap-1 font-medium text-base">
        Email
        <input
          type="email"
          className={`rounded border px-3 py-2 bg-transparent text-[var(--text-color)] font-normal border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-primary transition
          ${touched.email && errors.email ? "border-red-500" : ""}
          `}
          placeholder="Your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, email: true }))}
          required
          aria-invalid={!!(touched.email && errors.email)}
          aria-describedby="email-error"
          autoFocus
          autoComplete="email"
        />
        {touched.email && errors.email && (
          <span className="text-xs text-red-400" id="email-error">
            {errors.email}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-1 font-medium text-base">
        Password
        <input
          type="password"
          className={`rounded border px-3 py-2 bg-transparent text-[var(--text-color)] font-normal border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-primary transition
          ${touched.password && errors.password ? "border-red-500" : ""}
          `}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, password: true }))}
          required
          aria-invalid={!!(touched.password && errors.password)}
          aria-describedby="password-error"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
        />
        {touched.password && errors.password && (
          <span className="text-xs text-red-400" id="password-error">
            {errors.password}
          </span>
        )}
      </label>

      <button
        className="btn btn-large mt-2"
        type="submit"
        disabled={!isFormValid || loading || submitting}
        aria-busy={loading || submitting}
        aria-disabled={(!isFormValid || loading || submitting) ? "true" : undefined}
      >
        {mode === "login"
          ? (loading || submitting) ? "Signing in..." : "Sign In"
          : (loading || submitting) ? "Signing up..." : "Sign Up"}
      </button>

      {/* OAuth options */}
      {!!oauthOptions.length && (
        <div className="flex flex-col gap-2 mt-1">
          <div className="text-xs text-center text-[var(--text-secondary)]">or continue with</div>
          {oauthOptions.map(opt => (
            <button
              key={opt}
              type="button"
              className="btn btn-large border border-[var(--border-color)] bg-[var(--background-navbar)] text-[var(--text-color)] flex items-center justify-center gap-2"
              style={{ color: '#1a73e8' }}
              onClick={() => handleOAuth(opt)}
            >
              {opt === "Google" && (
                <svg
                  width={19} height={19} viewBox="0 0 24 24"
                  fill="currentColor"
                  className="inline mr-1"
                  aria-hidden="true"
                >
                  <g>
                    <path d="M21.805 10.023H12.27v3.974h5.412c-.234 1.3-1.492 3.808-5.412 3.808-3.255 0-5.914-2.694-5.914-6.025s2.659-6.026 5.914-6.026c1.854 0 3.102.79 3.815 1.476l2.613-2.544C17.022 2.96 14.882 2 12.27 2c-5.203 0-9.423 4.28-9.423 9.543 0 5.263 4.22 9.542 9.423 9.542 5.437 0 9.042-3.813 9.042-9.212 0-.618-.068-1.09-.15-1.35z"/>
                  </g>
                </svg>
              )}
              Continue with {opt}
            </button>
          ))}
        </div>
      )}
      {/* Passkey option */}
      {passkeyOption && (
        <button
          type="button"
          className="btn btn-large border border-[var(--border-color)] bg-[var(--background-navbar)] text-accent mt-2"
          onClick={handlePasskey}
        >
          <span role="img" aria-label="Passkey">🔑</span>
          {mode === "login" ? "Sign in with Passkey" : "Sign up with Passkey"}
        </button>
      )}
      <div className="flex items-center justify-center mt-2 gap-1 text-sm text-[var(--text-secondary)]">
        {mode === "login" ? (
          <>
            No account?
            <button
              type="button"
              onClick={() => switchMode("signup")}
              className="underline text-primary hover:text-accent font-medium bg-transparent border-0 ml-1"
              style={{ background: "none", padding: 0, border: "none", cursor: "pointer" }}
              tabIndex={0}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?
            <button
              type="button"
              onClick={() => switchMode("login")}
              className="underline text-primary hover:text-accent font-medium bg-transparent border-0 ml-1"
              style={{ background: "none", padding: 0, border: "none", cursor: "pointer" }}
              tabIndex={0}
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </form>
  );
}
