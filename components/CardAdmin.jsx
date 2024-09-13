import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

function CardAdmin({ nome, preco, imagemPrato }) {
  return (
    <Card
      sx={{
        padding: 1,
        backgroundColor: "#fff",
        width: "100%",
        height: "100px",
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
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Typography component="h1" sx={{ fontSize: "14px" }}>
          {nome}
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
          src={imagemPrato}
          alt="Imagem do prato"
          style={{ width: "120px", height: "70px", borderRadius: "8px" }}
        />
      </Box>
    </Card>
  );
}

export default CardAdmin;
