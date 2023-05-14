import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import * as dotenv from "dotenv";

import App from "./App.jsx";
import AuthProvider from "./components/authProvider";

dotenv.config();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
