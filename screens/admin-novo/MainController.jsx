import React, { useState, useContext } from "react";
import SidebarMenu from "./SidebarMenu";
import Restaurante from "./screens/Restaurante";
import Cardapio from "./screens/Cardapio";
import { Box, Typography, Toolbar, Hidden, CssBaseline } from "@mui/material";
import Loading from "../../components/Loading";
import { AdminRestaurantContext } from "../../src/AdminRestaurantContext";

const MainController = () => {
  const [activeScreen, setActiveScreen] = useState("Restaurante");
  const { restaurant, loading } = useContext(AdminRestaurantContext);

  if (loading) {
    return <Loading />;
  }

  const options = [
    { label: "Restaurante", icon: "IconThree" },
    { label: "Cardápio", icon: "IconTwo" },
    { label: "Pedidos", icon: "IconFour" },
    { label: "Fidelidade", icon: "IconOne" },
    { label: "Cupons", icon: "IconFive" },
    { label: "Atendimento", icon: "IconSix" },
  ];

  const renderContent = () => {
    switch (activeScreen) {
      case "Restaurante":
        return <Restaurante restaurant={restaurant} />;
      case "Cardápio":
        return <Cardapio restaurant={restaurant} />;
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
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", backgroundColor: "background.secondary" }}>
        <SidebarMenu
          options={options}
          activeScreen={activeScreen}
          onSelect={setActiveScreen}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 3 },
            ml: { md: 0 },
            mt: { xs: "-50px", md: 0 },
          }}
        >
          <Hidden mdUp>
            <Toolbar />
          </Hidden>
          {renderContent()}
        </Box>
      </Box>
    </>
  );
};

export default MainController;
