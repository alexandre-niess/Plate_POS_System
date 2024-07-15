import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

const alergenicosGlobais = [
  {
    nome: "Açúcar",
    imagem:
      "https://firebasestorage.googleapis.com/v0/b/siterestaurante-38459.appspot.com/o/alergenos%2Facucar.png?alt=media&token=8c5c019c-c207-4389-911d-3117c1226c41",
  },
  {
    nome: "Glúten",
    imagem:
      "https://firebasestorage.googleapis.com/v0/b/siterestaurante-38459.appspot.com/o/alergenos%2Fgluten.png?alt=media&token=b12f8558-efa5-42d3-953d-b2e17f9bc69b",
  },
  {
    nome: "Lactose",
    imagem:
      "https://firebasestorage.googleapis.com/v0/b/siterestaurante-38459.appspot.com/o/alergenos%2Flactose.png?alt=media&token=bc515dd5-6617-4668-956a-955bb22593c0",
  },
  {
    nome: "Vegetariano",
    imagem:
      "https://firebasestorage.googleapis.com/v0/b/siterestaurante-38459.appspot.com/o/alergenos%2Fvegetariano.png?alt=media&token=ed5d2754-efae-4153-98e6-62c9341c42a3",
  },
  {
    nome: "Ovo",
    imagem:
      "https://firebasestorage.googleapis.com/v0/b/siterestaurante-38459.appspot.com/o/alergenos%2Fovo.png?alt=media&token=69224c40-2705-4be3-9d20-1669875ce064",
  },
  {
    nome: "Soja",
    imagem:
      "https://firebasestorage.googleapis.com/v0/b/siterestaurante-38459.appspot.com/o/alergenos%2Fsoja.png?alt=media&token=4ca8557a-d964-4ce5-9851-8c5d0f04b8a4",
  },
];

function CardProduto({ nome, descricao, preco, imagemPrato, alergenicos }) {
  // Garantir que alergenicos seja uma string e então dividir
  const alergenicosArray = Array.isArray(alergenicos)
    ? alergenicos
    : alergenicos.split(",").map((alergenico) => alergenico.trim());

  const alergenicosFiltrados = alergenicosGlobais.filter((alergenico) =>
    alergenicosArray.includes(alergenico.nome)
  );

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
          src={imagemPrato}
          alt="Imagem do prato"
          style={{ width: "120px", height: "70px", borderRadius: "8px" }}
        />
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            marginTop: "5px",
          }}
        >
          {alergenicosFiltrados.map((alergenico, index) => (
            <img
              key={index}
              src={alergenico.imagem}
              alt={alergenico.nome}
              style={{ width: "30px", height: "30px" }}
            />
          ))}
        </Box>
      </Box>
    </Card>
  );
}

export default CardProduto;
