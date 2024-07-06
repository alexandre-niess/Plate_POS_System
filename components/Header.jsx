import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShareIcon from "@mui/icons-material/Share";

function Header() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 64,
          padding: 1,
          backgroundColor: "#443399",
          width: "100%",
          position: "fixed",
          top: 0,
          zIndex: 1,
        }}
      >
        <Typography variant="h6" component="h1" align="left">
          Restaurante Bom Sabor
        </Typography>
        <Box>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "64px", // Adicionando margem superior para evitar sobreposição
          padding: 1,
          width: "100%",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography component="h1" align="left" sx={{ fontSize: "12px" }}>
          Aberto até as 22h - Pedido min. R$20,00
        </Typography>
        <Typography component="h1" align="left" sx={{ fontSize: "12px" }}>
          Ver perfil da loja
        </Typography>
      </Box>
    </>
  );
}

export default Header;
