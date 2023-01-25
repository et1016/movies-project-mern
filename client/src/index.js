import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  // 防止 useEffect 執行兩次
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);
