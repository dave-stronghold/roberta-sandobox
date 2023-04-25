import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Envelope from "./Components/Envelope";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Envelope />
  </StrictMode>
);
