/**
 * Application Entry Point
 * Sets up the React application with necessary providers and configurations
 *
 * Includes:
 * - StrictMode for highlighting potential problems
 * - ApiProvider for global API context
 * - Root DOM rendering
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApiProvider } from "./context/ApiContext";

// Create and render the root application
// Wrapped in StrictMode for development safety checks
// ApiProvider enables global access to API functionality
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiProvider>
      <App />
    </ApiProvider>
  </StrictMode>
);
