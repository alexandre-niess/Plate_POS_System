// MainController.jsx
import React, { useState } from "react";
import SidebarMenu from "./SidebarMenu";
import Restaurante from "./screens/Restaurante";
import { Box, Typography, Toolbar, Hidden } from "@mui/material";

const MainController = () => {
  const [activeScreen, setActiveScreen] = useState("Restaurante");

  const options = [
    "Restaurante",
    "Cardápio",
    "Pedidos",
    "Fidelidade",
    "Cupons",
    "Atendimento",
  ];

  const renderContent = () => {
    switch (activeScreen) {
      case "Restaurante":
        return <Restaurante />;
      case "Cardápio":
        return <Typography variant="h4">Cardápio Screen</Typography>;
      case "Pedidos":
        return <Typography variant="h4">Pedidos Screen</Typography>;
      case "Fidelidade":
        return <Typography variant="h4">Fidelidade Screen</Typography>;
      case "Cupons":
        return <Typography variant="h4">Cupons Screen</Typography>;
      case "Atendimento":
        return <Typography variant="h4">Atendimento Screen</Typography>;
      default:
        return <Typography variant="h4">Restaurante Screen</Typography>;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu options={options} onSelect={setActiveScreen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          ml: {}, // Ajuste a margem esquerda para o drawerWidth
          mt: { xs: "64px", md: 0 }, // Ajuste o topo em modo mobile para desconsiderar o AppBar
        }}
      >
        <Hidden mdUp>
          <Toolbar />
        </Hidden>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default MainController;
