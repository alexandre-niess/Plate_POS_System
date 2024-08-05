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
import EditRestaurante from "../screens/EditRestaurante/EditRestaurante.jsx";
import EditPrato from "../screens/EditPrato.jsx";
import { createTheme, ThemeProvider } from "@mui/material";
import Restaurant from "../screens/Restaurant.jsx";
import { AdminRestaurantProvider } from "./AdminRestaurantContext.jsx";

const temaRest = createTheme({
  palette: {
    primary: {
      main: "#2A3A44", // cor primaria
    },
    background: {
      default: "#fff",
      secondary: "#f5f5f5",
      cinza: "#CFCFCF",
    },
    text: {
      primary: "#333333",
      secondary: "#8C8C8C",
      white: "#fff",
      details: "#8C8C8C",
    },
    decorations: {
      divider: "#DCDCDC",
    },
  },
  shape: {
    borderRadius: 5,
  },
  typography: {
    fontFamily: "Lexend, sans-serif",
  },
});

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={temaRest}>
    <RestaurantProvider>
      <AdminRestaurantProvider>
        <PratoProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path=":restaurantName" element={<Restaurant />} />
              <Route
                path="perfil-da-loja/:restaurantName"
                element={<PerfilEmp />}
              />

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
                path="editar-restaurante"
                element={
                  <ProtectedRoute>
                    <EditRestaurante />
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
              <Route
                path="edit-prato/:id"
                element={
                  <ProtectedRoute>
                    <EditPrato />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </BrowserRouter>
        </PratoProvider>
      </AdminRestaurantProvider>
    </RestaurantProvider>
  </ThemeProvider>
);
