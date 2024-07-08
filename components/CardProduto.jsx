import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

const alergenicos = [
  {
    nome: "Açúcar",
    imagem: "../public/acucar.png",
  },
  {
    nome: "Glúten",
    imagem: "../public/gluten.png",
  },
  {
    nome: "Lactose",
    imagem: "../public/lactose.png",
  },
  {
    nome: "Vegetariano",
    imagem: "../public/vegetariano.png",
  },
  {
    nome: "Ovo",
    imagem: "../public/ovo.png",
  },
  {
    nome: "Soja",
    imagem: "../public/soja.png",
  },
];

function CardProduto({
  nome,
  descricao,
  preco,
  categoria,
  imagemPrato,
  alergenicos,
}) {
  return (
    <Card
      sx={{
        padding: 1,
        backgroundColor: "background.secondary",
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="../public/imagemprato.png"
          alt="Imagem do prato"
          style={{ width: "120px", height: "70px", borderRadius: "8px" }}
        />
        <Box sx={{
          display: "flex",
          gap: "5px",
          marginTop: "5px",

        }}>
          <img
            src="../public/acucar.png"
            alt="Imagem do prato"
            style={{ width: "30px", height: "30px" }}
          />
          <img
            src="../public/acucar.png"
            alt="Imagem do prato"
            style={{ width: "30px", height: "30px" }}
          />
          <img
            src="../public/vegetariano.png"
            alt="Imagem do prato"
            style={{ width: "30px", height: "30px" }}
          />
        </Box>
      </Box>
    </Card>
  );
}

export default CardProduto;
