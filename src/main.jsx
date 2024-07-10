import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "../screens/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PerfilEmp from "../screens/PerfilEmp.jsx";
import { createRoot } from "react-dom";
import { CadPrato } from "../screens/CadPrato.jsx";
import { Login } from "../screens/Login.jsx";
import { CadAdmin } from "../screens/CadAdmin.jsx";
import ProtectedRoute from "./ProtectedRoute";
import CadRestaurante from "../screens/CadRestaurante/CadRestaurante.jsx";
import Admin from "../screens/Admin.jsx";
import { RestaurantProvider } from "./RestaurantContext.jsx"; // Importe o provider

createRoot(document.getElementById("root")).render(
  <RestaurantProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/AppRestaurante" element={<App />}>
          <Route index element={<Home />} />
          <Route path="perfil-da-loja" element={<PerfilEmp />} />
          <Route path="login" element={<Login />} />
          <Route path="cadastro-admin" element={<CadAdmin />} />
          <Route path="cadastro-restaurante" element={<CadRestaurante />} />
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="cad-prato"
            element={
              <ProtectedRoute>
                <CadPrato />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </RestaurantProvider>
);
