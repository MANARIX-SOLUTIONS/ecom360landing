import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { trialCtaEssaiGratuitPlan, trialLabelJours } from "./trial";

const j = trialLabelJours();
const essai = trialCtaEssaiGratuitPlan();
document
  .querySelector('meta[name="description"]')
  ?.setAttribute(
    "content",
    `Ecom 360 PME — vendez plus vite avec Wave, Orange Money, POS et stocks en direct. Essai Pro ${j}, accompagnement inclus. Commerces au Sénégal et en Afrique.`,
  );
document
  .querySelector('meta[property="og:description"]')
  ?.setAttribute(
    "content",
    `POS, stocks, Wave & Orange Money, rapports et multi-boutiques. ${essai} — Sénégal & Afrique.`,
  );

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
