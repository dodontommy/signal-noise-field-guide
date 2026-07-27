import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NoiseGuide from "../components/noise-guide";
import "../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NoiseGuide />
  </StrictMode>,
);
