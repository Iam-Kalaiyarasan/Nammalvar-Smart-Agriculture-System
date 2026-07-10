import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./styles/dashboard.css";

import "./styles/style.css";

// import "./styles/global.css";
// import "./styles/navbar.css";
// import "./styles/sidebar.css";
// import "./styles/dashboard.css";
// import "./styles/marketplace.css";
// import "./styles/forms.css";
// import "./styles/chatbot.css";
// import "./styles/responsive.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);