import React from "react";
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import CardProduto from "../components/CardProduto";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

export function Home() {
  const [categoriaVisivel, setCategoriaVisivel] = useState("");
  const categoriasRefs = useRef({});
  const containerRef = useRef(null);

  const categorias = [
    "Italiana",
    "Americana",
    "Japonesa",
    "Saladas",
    "Mexicana",
    "Brasileira",
    "Carnes",
    "Bebidas",
  ];

  const pratos = [
    {
      nome: "Pizza Margherita",
      descricao: "Deliciosa pizza com queijo e manjericão.",
      preco: "30,00",
      categoria: "Italiana",
    },
    {
      nome: "Hambúrguer Artesanal",
      descricao: "Hambúrguer com carne de qualidade e molhos especiais.",
      preco: "25,00",
      categoria: "Americana",
    },
    {
      nome: "Sushi Combo",
      descricao: "Combo com 20 peças de sushi fresquinho.",
      preco: "45,00",
      categoria: "Japonesa",
    },
    {
      nome: "Spaghetti Carbonara",
      descricao: "Spaghetti com molho carbonara autêntico.",
      preco: "35,00",
      categoria: "Italiana",
    },
    {
      nome: "Salada Caesar",
      descricao: "Salada Caesar com frango grelhado e molho especial.",
      preco: "20,00",
      categoria: "Saladas",
    },
    {
      nome: "Tacos Mexicanos",
      descricao: "Tacos autênticos com carne e guacamole.",
      preco: "28,00",
      categoria: "Mexicana",
    },
    {
      nome: "Frango à Parmegiana",
      descricao: "Frango empanado com molho de tomate e queijo.",
      preco: "32,00",
      categoria: "Brasileira",
    },
    {
      nome: "Lasanha Bolonhesa",
      descricao: "Lasanha com molho bolonhesa e muito queijo.",
      preco: "38,00",
      categoria: "Italiana",
    },
    {
      nome: "Risoto de Camarão",
      descricao: "Risoto cremoso com camarões frescos.",
      preco: "42,00",
      categoria: "Italiana",
    },
    {
      nome: "Bife Ancho",
      descricao: "Bife ancho grelhado no ponto perfeito.",
      preco: "50,00",
      categoria: "Carnes",
    },
    {
      nome: "Coca-Cola Lata",
      descricao: "Coca-Cola gelada em lata 350ml.",
      preco: "5,00",
      categoria: "Bebidas",
    },
    {
      nome: "Guaraná Antarctica",
      descricao: "Guaraná Antarctica gelado 350ml.",
      preco: "5,00",
      categoria: "Bebidas",
    },
    {
      nome: "Água Mineral",
      descricao: "Água mineral sem gás 500ml.",
      preco: "3,00",
      categoria: "Bebidas",
    },
    {
      nome: "Fanta Laranja",
      descricao: "Água mineral sem gás 500ml.",
      preco: "5,00",
      categoria: "Bebidas",
    },
  ];

  const handleCategoriaClick = (categoria) => {
    if (categoriasRefs.current[categoria]) {
      const offsetTop = categoriasRefs.current[categoria].offsetTop - 160; // Altura do Header + espaço extra
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setCategoriaVisivel(categoria); // Set categoriaVisivel to the clicked category
    }
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <Box
        ref={containerRef}
        sx={{
          position: "fixed",
          top: "84px", // altura do Header
          width: "100%",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          whiteSpace: "nowrap",
          "::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none", // IE and Edge
          "scrollbar-width": "none", // Firefox
          zIndex: 1,
        }}
      >
        {categorias.map((categoria) => (
          <Box
            key={categoria}
            ref={(el) => (categoriasRefs.current[categoria] = el)}
            onClick={() => handleCategoriaClick(categoria)}
            sx={{
              display: "inline-block",
              marginRight: 3,
              padding: "16px 8px", // ajuste de padding para melhor visualização
              cursor: "pointer",
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: categoriaVisivel === categoria ? "bold" : "normal",
                color:
                  categoriaVisivel === categoria
                    ? "primary.main"
                    : "text.primary",
              }}
            >
              {categoria}
            </Typography>
          </Box>
        ))}
      </Box>

      <Container
        sx={{
          paddingTop: "160px", // Ajuste conforme necessário
          paddingBottom: "16px",
        }}
      >
        {categorias.map((categoria) => (
          <Box
            key={categoria}
            id={categoria}
            ref={(el) => (categoriasRefs.current[categoria] = el)}
            sx={{ marginBottom: 4 }}
          >
            <Typography variant="h5" component="h3">
              {categoria}
            </Typography>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              {pratos
                .filter((prato) => prato.categoria === categoria)
                .map((prato, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <CardProduto
                      nome={prato.nome}
                      descricao={prato.descricao}
                      preco={prato.preco}
                      categoria={prato.categoria}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        ))}
      </Container>
    </>
  );
}

export default Home;
