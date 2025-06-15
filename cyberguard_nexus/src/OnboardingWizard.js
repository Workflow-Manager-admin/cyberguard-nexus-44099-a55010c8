import React, { useState } from "react";

/**
 * OnboardingWizard for guided permissions and platform/device selection.
 * Steps:
 *  1. Permissions selection (email scan, social sync, browser sync)
 *  2. Device/platform selection (Google, Facebook, Other)
 * At submit, performs a "grant" (UI-only), and calls onComplete().
 */
// PUBLIC_INTERFACE
export default function OnboardingWizard({ onComplete }) {
  // Step state
  const [step, setStep] = useState(0);
  // Permissions
  const [permissions, setPermissions] = useState({
    emailScan: true,
    socialSync: false,
    browserSync: false,
  });
  // Platform selection
  const platformsAvailable = [
    { label: "Google", icon: "🟢" },
    { label: "Facebook", icon: "🔵" },
    { label: "Microsoft", icon: "🟣" },
    { label: "Apple", icon: "⚪️" },
    { label: "Other", icon: "💻" },
  ];
  const [platformSelections, setPlatformSelections] = useState([]);

  // "Grant in progress" state
  const [granting, setGranting] = useState(false);

  const handlePermissionChange = (perm) => {
    setPermissions((prev) => ({
      ...prev,
      [perm]: !prev[perm],
    }));
  };

  const handlePlatformToggle = (label) => {
    setPlatformSelections((selected) =>
      selected.includes(label)
        ? selected.filter((p) => p !== label)
        : [...selected, label]
    );
  };

  // Handle submit and fake "grant"
  const handleSubmit = () => {
    setGranting(true);
    setTimeout(() => {
      setGranting(false);
      if (typeof onComplete === "function") onComplete();
    }, 1200);
  };

  // Steps definitions
  const steps = [
    {
      title: "Choose Permissions",
      content: (
        <div className="flex flex-col gap-4 mt-5 mb-1 max-w-sm mx-auto">
          <label className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--background-navbar)] border border-[var(--border-color)] focus-within:ring-2 focus-within:ring-primary">
            <input
              type="checkbox"
              checked={permissions.emailScan}
              onChange={() => handlePermissionChange("emailScan")}
              className="accent-primary w-5 h-5"
            />
            <span>
              <b>Email Exposure Scan</b>
              <span className="ml-1 text-xs text-[var(--text-secondary)]">
                (recommended)
              </span>
            </span>
          </label>
          <label className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--background-navbar)] border border-[var(--border-color)] focus-within:ring-2 focus-within:ring-primary">
            <input
              type="checkbox"
              checked={permissions.socialSync}
              onChange={() => handlePermissionChange("socialSync")}
              className="accent-secondary w-5 h-5"
            />
            <span>
              <b>Social Account Sync</b>
              <span className="ml-1 text-xs text-[var(--text-secondary)]">
                (Optional: Facebook, Google)
              </span>
            </span>
          </label>
          <label className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--background-navbar)] border border-[var(--border-color)] focus-within:ring-2 focus-within:ring-primary">
            <input
              type="checkbox"
              checked={permissions.browserSync}
              onChange={() => handlePermissionChange("browserSync")}
              className="accent-accent w-5 h-5"
            />
            <span>
              <b>Browser Sync</b>
              <span className="ml-1 text-xs text-[var(--text-secondary)]">
                (Chrome, Edge, Firefox)
              </span>
            </span>
          </label>
        </div>
      ),
      nextLabel: "Next: Select Platforms",
    },
    {
      title: "Select Devices / Platforms",
      content: (
        <div className="flex flex-wrap justify-between gap-4 mt-6 mb-2 max-w-md mx-auto">
          {platformsAvailable.map((p) => (
            <button
              key={p.label}
              className={`flex flex-col items-center gap-1 px-5 py-3 rounded-xl border-2 text-lg font-semibold
                transition border-${platformSelections.includes(p.label) ? "primary" : "border"}
                ${platformSelections.includes(p.label)
                  ? "bg-[var(--color-primary)]/10 border-primary ring-2 ring-primary"
                  : "bg-[var(--background-navbar)] border-[var(--border-color)]"}
                focus:outline-none focus:ring-2 focus:ring-primary`}
              type="button"
              aria-pressed={platformSelections.includes(p.label)}
              onClick={() => handlePlatformToggle(p.label)}
              tabIndex={0}
              style={{
                borderColor: platformSelections.includes(p.label)
                  ? "var(--color-primary)"
                  : "var(--border-color)",
                color: platformSelections.includes(p.label)
                  ? "var(--color-primary)"
                  : "var(--text-color)",
                minWidth: 80,
                minHeight: 70,
              }}
            >
              <span role="img" aria-label={p.label} className="text-xl mb-1">
                {p.icon}
              </span>
              {p.label}
            </button>
          ))}
        </div>
      ),
      nextLabel: "Grant & Continue",
    },
  ];

  return (
    <div className="p-2">
      <div className="mb-2">
        <div className="text-xl font-bold text-center mb-1">{steps[step].title}</div>
        <div className="text-sm text-center text-[var(--text-secondary)] mb-1">
          Step {step + 1} of {steps.length}
        </div>
      </div>
      {steps[step].content}
      <div className="flex flex-row justify-between items-center mt-6">
        {step > 0 ? (
          <button
            className="btn bg-transparent text-primary border border-[var(--color-primary)]"
            type="button"
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </button>
        ) : (
          <span />
        )}
        {step < steps.length - 1 ? (
          <button
            className="btn btn-large"
            type="button"
            onClick={() => setStep((s) => s + 1)}
            aria-disabled={false}
          >
            {steps[step].nextLabel}
          </button>
        ) : (
          <button
            className="btn btn-large"
            type="button"
            onClick={handleSubmit}
            disabled={granting || platformSelections.length === 0}
            aria-busy={granting}
            aria-disabled={granting || platformSelections.length === 0 ? "true" : undefined}
          >
            {granting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin inline-block">🔄</span> Granting...
              </span>
            ) : (
              "Finish & Go To Dashboard"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
