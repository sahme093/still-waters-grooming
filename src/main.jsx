import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { salon } from "./config.js";
import "./index.css";

// Push every color in config.js onto :root as a CSS custom property, so
// index.css can reference var(--color-accent) etc. without duplicating the
// palette. Runs before render so there's no flash of unstyled/default color.
Object.entries(salon.colors).forEach(([key, value]) => {
  document.documentElement.style.setProperty(`--color-${key}`, value);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
