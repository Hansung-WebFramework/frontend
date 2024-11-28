// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';

async function enableMocking() {
  if (import.meta.env.MODE !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser"); //Dynamic import하는 것이 눈에 띄였다.
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});