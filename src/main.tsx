import React from "react";
import { createRoot } from "react-dom/client";
// biome-ignore lint/nursery/useImportRestrictions: Need to import App to inject it into the root
import App from "./app/app";
import "./index.css";

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
