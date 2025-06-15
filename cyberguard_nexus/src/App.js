import React from 'react';
import './App.css';
import { ThemeProvider, useTheme } from "./ThemeProvider";

// Theme toggle button (shows sun/moon icon)
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className="btn"
      style={{
        minWidth: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 20px"
      }}
      aria-label="Toggle dark/light mode"
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        // Sun icon (light mode)
        <span role="img" aria-label="Light mode" style={{fontSize: '1.3em'}}>🌞 Light</span>
      ) : (
        // Moon icon (dark mode)
        <span role="img" aria-label="Dark mode" style={{fontSize: '1.3em'}}>🌜 Dark</span>
      )}
    </button>
  );
}

function AppContent() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="hero">
            <div className="subtitle">AI Workflow Manager Template</div>

            <h1 className="title">cyberguard_nexus</h1>

            <div className="description">
              Start building your application.
            </div>

            <button className="btn btn-large">Button</button>
          </div>
        </div>
      </main>
    </div>
  );
}

// App entry: wrap in ThemeProvider to expose theme context
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;