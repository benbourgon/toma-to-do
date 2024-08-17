import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./app";

const domNode = document.getElementById("root");
if (!domNode) {
  throw new Error("Root element not found");
}
const root = createRoot(domNode);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
