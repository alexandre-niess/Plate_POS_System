import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShareIcon from "@mui/icons-material/Share";
import Card from "@mui/material/Card";

function CardProduto() {
  return (
    <Card
      sx={{
        marginTop: "64px",
        padding: 1,
        backgroundColor: "#f5f5f5",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography component="h1" sx={{ fontSize: "12px" }}>
            Aberto até as 22h - Pedido min. R$20,00
          </Typography>
          <Typography component="h1" sx={{ fontSize: "12px" }}>
            Ver perfil da loja
          </Typography>
          <Typography component="h1" sx={{ fontSize: "12px" }}>
            Ver perfil da loja
          </Typography>
        </Box>

        <img
          src="../public/imagemprato.png"
          alt="Imagem do prato"
          style={{ maxWidth: "30%", height: "auto" }}
        />
      </Box>
    </Card>
  );
}

export default CardProduto;
