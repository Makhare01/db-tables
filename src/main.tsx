import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import "react-toastify/dist/ReactToastify.css";
import "./styles/fonts.css";
import "./styles/global.css";
import "./styles/toast.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
