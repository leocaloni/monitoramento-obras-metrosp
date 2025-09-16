import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import logoSimple from "./assets/logo-metro-simples.png";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Set document title and favicon dynamically
document.title = "Metrô SP · Monitoramento de Canteiros (BIM)";
const ensureFavicon = () => {
  let link: HTMLLinkElement | null = document.querySelector("link[rel='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = logoSimple;
};
ensureFavicon();
