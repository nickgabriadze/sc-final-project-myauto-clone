import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.module.css";
import { Provider } from "react-redux";
import { MyAutoStore } from "./store.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={MyAutoStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
