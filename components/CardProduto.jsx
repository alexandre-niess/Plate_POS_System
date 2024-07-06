import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

function CardProduto({ nome, descricao, preco, categoria }) {
  return (
    <Card
      sx={{
        padding: 1,
        backgroundColor: "#f5f5f5",
        maxHeight: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <Typography component="h1" sx={{ fontSize: "14px" }}>
          {nome}
        </Typography>
        <Typography component="h1" sx={{ fontSize: "12px" }}>
          {descricao}
        </Typography>
        <Typography component="h1" sx={{ fontSize: "16px" }}>
          R${preco}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="../public/imagemprato.png"
          alt="Imagem do prato"
          style={{ width: "100px", height: "auto", borderRadius: "8px" }}
        />
      </Box>
    </Card>
  );
}

export default CardProduto;
