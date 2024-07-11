import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "../screens/Home.jsx";
import PerfilEmp from "../screens/PerfilEmp.jsx";
import { CadPrato } from "../screens/CadPrato.jsx";
import { Login } from "../screens/Login.jsx";
import { CadAdmin } from "../screens/CadAdmin.jsx";
import ProtectedRoute from "./ProtectedRoute";
import CadRestaurante from "../screens/CadRestaurante/CadRestaurante.jsx";
import Admin from "../screens/Admin.jsx";
import { RestaurantProvider } from "./RestaurantContext.jsx"; // Importe o provider
import { PratoProvider } from "./PratoContext.jsx";

createRoot(document.getElementById("root")).render(
  <RestaurantProvider>
    <PratoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/AppRestaurante" element={<App />}>
            <Route index element={<Home />} />
            <Route path="perfil-da-loja" element={<PerfilEmp />} />
            <Route path="login" element={<Login />} />
            <Route path="cadastro-admin" element={<CadAdmin />} />
            <Route
              path="cadastro-restaurante"
              element={
                <ProtectedRoute>
                  <CadRestaurante />
                </ProtectedRoute>
              }
            />
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
    </PratoProvider>
  </RestaurantProvider>
);
