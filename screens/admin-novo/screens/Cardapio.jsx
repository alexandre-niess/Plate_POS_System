import React, { useState } from "react";
import { Grid, Box, Typography, Tabs, Tab, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CardAdmin from "../../../components/CardAdmin";

const produtosMockados = [
  {
    nome: "Pizza Margherita",
    descricao: "Massa fina, molho de tomate, queijo e manjericão.",
    preco: 30.5,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Glúten, Lactose",
  },
  {
    nome: "Hambúrguer",
    descricao: "Pão artesanal, carne bovina, queijo, bacon e alface.",
    preco: 25.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Glúten, Lactose",
  },
  {
    nome: "Sushi Combo",
    descricao: "10 peças de sushi variado.",
    preco: 40.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Soja, Peixe",
  },
  {
    nome: "Pizza Margherita",
    descricao: "Massa fina, molho de tomate, queijo e manjericão.",
    preco: 30.5,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Glúten, Lactose",
  },
  {
    nome: "Hambúrguer",
    descricao: "Pão artesanal, carne bovina, queijo, bacon e alface.",
    preco: 25.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Glúten, Lactose",
  },
  {
    nome: "Sushi Combo",
    descricao: "10 peças de sushi variado.",
    preco: 40.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Soja, Peixe",
  },
  {
    nome: "Espaguete Carbonara",
    descricao: "Espaguete ao molho carbonara, com bacon e parmesão.",
    preco: 35.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Glúten, Lactose",
  },
  {
    nome: "Pizza Margherita",
    descricao: "Massa fina, molho de tomate, queijo e manjericão.",
    preco: 30.5,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Glúten, Lactose",
  },
  {
    nome: "Hambúrguer",
    descricao: "Pão artesanal, carne bovina, queijo, bacon e alface.",
    preco: 25.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Glúten, Lactose",
  },
  {
    nome: "Sushi Combo",
    descricao: "10 peças de sushi variado.",
    preco: 40.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Soja, Peixe",
  },
  {
    nome: "Pizza Margherita",
    descricao: "Massa fina, molho de tomate, queijo e manjericão.",
    preco: 30.5,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Glúten, Lactose",
  },
  {
    nome: "Hambúrguer",
    descricao: "Pão artesanal, carne bovina, queijo, bacon e alface.",
    preco: 25.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Glúten, Lactose",
  },
  {
    nome: "Sushi Combo",
    descricao: "10 peças de sushi variado.",
    preco: 40.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Soja, Peixe",
  },
  {
    nome: "Espaguete Carbonara",
    descricao: "Espaguete ao molho carbonara, com bacon e parmesão.",
    preco: 35.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Glúten, Lactose",
  },
];

const adicionaisMockados = [
  {
    nome: "Batata Frita",
    descricao: "Porção de batata frita crocante.",
    preco: 10.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "",
  },
  {
    nome: "Molho Especial",
    descricao: "Molho da casa com ingredientes secretos.",
    preco: 5.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Glúten",
  },
  {
    nome: "Queijo Extra",
    descricao: "Adicional de queijo para o seu prato.",
    preco: 3.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Lactose",
  },
  {
    nome: "Bacon Extra",
    descricao: "Adicional de bacon crocante.",
    preco: 4.5,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "",
  },
  {
    nome: "Batata Frita",
    descricao: "Porção de batata frita crocante.",
    preco: 10.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "",
  },
  {
    nome: "Molho Especial",
    descricao: "Molho da casa com ingredientes secretos.",
    preco: 5.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Glúten",
  },
  {
    nome: "Queijo Extra",
    descricao: "Adicional de queijo para o seu prato.",
    preco: 3.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Lactose",
  },
  {
    nome: "Bacon Extra",
    descricao: "Adicional de bacon crocante.",
    preco: 4.5,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "",
  },
  {
    nome: "Batata Frita",
    descricao: "Porção de batata frita crocante.",
    preco: 10.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "",
  },
  {
    nome: "Molho Especial",
    descricao: "Molho da casa com ingredientes secretos.",
    preco: 5.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Glúten",
  },
  {
    nome: "Queijo Extra",
    descricao: "Adicional de queijo para o seu prato.",
    preco: 3.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Lactose",
  },
  {
    nome: "Bacon Extra",
    descricao: "Adicional de bacon crocante.",
    preco: 4.5,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "",
  },
  {
    nome: "Batata Frita",
    descricao: "Porção de batata frita crocante.",
    preco: 10.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "",
  },
  {
    nome: "Molho Especial",
    descricao: "Molho da casa com ingredientes secretos.",
    preco: 5.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Glúten",
  },
  {
    nome: "Queijo Extra",
    descricao: "Adicional de queijo para o seu prato.",
    preco: 3.0,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "Lactose",
  },
  {
    nome: "Bacon Extra",
    descricao: "Adicional de bacon crocante.",
    preco: 4.5,
    imagemPrato: "https://via.placeholder.com/120x70",
    alergenicos: "",
  },
];
const Cardapio = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detecta se está no mobile

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Cardápio
      </Typography>

      {/* Tabs principais */}
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="tabs de cardápio"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Produtos" />
        {isMobile && <Tab label="Adicionais" />}
        {!isMobile && <Tab label="Categorias e Promoções" />}
      </Tabs>

      {/* Conteúdo para desktop e tablets (Produtos e Adicionais juntos) */}
      {!isMobile && tabIndex === 0 && (
        <Box sx={{ marginTop: 3 }}>
          <Grid container spacing={3} sx={{ height: "calc(100vh - 150px)" }}>
            {/* Coluna para Produtos */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                height: "100%",
                overflowY: "auto", // Adiciona scroll na coluna
                paddingRight: "10px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Produtos
              </Typography>
              <Grid container spacing={2}>
                {produtosMockados.map((produto, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <CardAdmin
                      nome={produto.nome}
                      preco={produto.preco}
                      imagemPrato={produto.imagemPrato}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Coluna para Adicionais */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                height: "100%",
                overflowY: "auto", // Adiciona scroll na coluna
                paddingLeft: "10px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Adicionais
              </Typography>
              <Grid container spacing={2}>
                {adicionaisMockados.map((adicional, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <CardAdmin
                      nome={adicional.nome}
                      preco={adicional.preco}
                      imagemPrato={adicional.imagemPrato}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Conteúdo para mobile (Produtos e Adicionais em tabs separadas) */}
      {isMobile && tabIndex === 0 && (
        <Box
          sx={{
            marginTop: 3,
            height: "calc(100vh - 150px)",
            overflowY: "auto",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Produtos
          </Typography>
          <Grid container spacing={2}>
            {produtosMockados.map((produto, index) => (
              <Grid item xs={12} key={index}>
                <CardAdmin
                  nome={produto.nome}
                  preco={produto.preco}
                  imagemPrato={produto.imagemPrato}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {isMobile && tabIndex === 1 && (
        <Box
          sx={{
            marginTop: 3,
            height: "calc(100vh - 150px)",
            overflowY: "auto",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Adicionais
          </Typography>
          <Grid container spacing={2}>
            {adicionaisMockados.map((adicional, index) => (
              <Grid item xs={12} key={index}>
                <CardAdmin
                  nome={adicional.nome}
                  preco={adicional.preco}
                  imagemPrato={adicional.imagemPrato}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Conteúdo da segunda aba (Categorias e Promoções) */}
      {!isMobile && tabIndex === 1 && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6">Categorias e Promoções</Typography>
          {/* Coloque o conteúdo relacionado à segunda aba aqui */}
        </Box>
      )}
    </Box>
  );
};

export default Cardapio;
