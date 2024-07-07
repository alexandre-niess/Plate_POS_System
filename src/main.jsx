import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "../screens/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PerfilEmp from "../screens/PerfilEmp.jsx";
import { createRoot } from "react-dom";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/AppRestaurante" element={<App />}>
          <Route index element={<Home />} />
          <Route path="perfil-da-loja" element={<PerfilEmp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
