import React, { useState, useRef, useEffect } from "react";
import CardProduto from "../components/CardProduto";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import { Avatar } from "@mui/material";
import Footer from "../components/Footer";

export function Home() {
  const [categoriaVisivel, setCategoriaVisivel] = useState("");
  const categoriasRefs = useRef({});
  const categoriasContainerRef = useRef(null);

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
      imagemPrato: "../public/imagemprato.png",
      alergenicos: "Glúten,Lactose,Vegetariano",
    },
    {
      nome: "Hambúrguer Artesanal",
      descricao: "Hambúrguer com carne de qualidade e molhos especiais.",
      preco: "25,00",
      categoria: "Americana",
      imagemPrato: "../public/imagemprato.png",
      alergenicos: "Glúten,Lactose,Vegetariano",
    },
    {
      nome: "Sushi Combo",
      descricao: "Combo com 20 peças de sushi fresquinho.",
      preco: "45,00",
      categoria: "Japonesa",
      imagemPrato: "../public/imagemprato.png",
      alergenicos: "Glúten,Lactose,Vegetariano",
    },
    {
      nome: "Poke",
      descricao: "Combo com 20 peças de sushi fresquinho.",
      preco: "45,00",
      categoria: "Japonesa",
      imagemPrato: "../public/imagemprato.png",
      alergenicos: "Glúten,Lactose,Vegetariano",
    },
    {
      nome: "Spaghetti Carbonara",
      descricao: "Spaghetti com molho carbonara autêntico.",
      preco: "35,00",
      categoria: "Italiana",
      imagemPrato: "../public/imagemprato.png",
      alergenicos: "Glúten,Lactose,Vegetariano",
    },
    {
      nome: "Salada Caesar",
      descricao: "Salada Caesar com frango grelhado e molho especial.",
      preco: "20,00",
      categoria: "Saladas",
      imagemPrato: "../public/imagemprato.png",
      alergenicos: "Glúten,Lactose,Vegetariano",
    },
    {
      nome: "Tacos Mexicanos",
      descricao: "Tacos autênticos com carne e guacamole.",
      preco: "28,00",
      categoria: "Mexicana",
      imagemPrato: "../public/imagemprato.png",
      alergenicos: "Glúten,Lactose,Vegetariano",
    },
    {
      nome: "Frango à Parmegiana",
      descricao: "Frango empanado com molho de tomate e queijo.",
      preco: "32,00",
      categoria: "Brasileira",
      imagemPrato: "../public/imagemprato.png",
      alergenicos: "Glúten,Lactose,Vegetariano",
    },
    {
      nome: "Lasanha Bolonhesa",
      descricao: "Lasanha com molho bolonhesa e muito queijo.",
      preco: "38,00",
      categoria: "Italiana",
      imagemPrato: "../public/imagemprato.png",
      alergenicos: "Glúten,Lactose,Vegetariano",
    },
    {
      nome: "Risoto de Camarão",
      descricao: "Risoto cremoso com camarões frescos.",
      preco: "42,00",
      categoria: "Italiana",
      imagemPrato: "../public/imagemprato.png",
      alergenicos: "Glúten,Lactose,Vegetariano",
    },
    {
      nome: "Bife Ancho",
      descricao: "Bife ancho grelhado no ponto perfeito.",
      preco: "50,00",
      categoria: "Carnes",
      imagemPrato: "../public/imagemprato.png",
      alergenicos: "Glúten,Lactose,Vegetariano",
    },
    {
      nome: "Coca-Cola Lata",
      descricao: "Coca-Cola gelada em lata 350ml.",
      preco: "5,00",
      categoria: "Bebidas",
      imagemPrato: "../public/imagemprato.png",
      alergenicos: "Glúten,Lactose,Vegetariano",
    },
    {
      nome: "Guaraná Antarctica",
      descricao: "Guaraná Antarctica gelado 350ml.",
      preco: "5,00",
      categoria: "Bebidas",
      imagemPrato: "../public/imagemprato.png",
      alergenicos: "Glúten,Lactose,Vegetariano",
    },
    {
      nome: "Água Mineral",
      descricao: "Água mineral sem gás 500ml.",
      preco: "3,00",
      categoria: "Bebidas",
      imagemPrato: "../public/imagemprato.png",
      alergenicos: "Glúten,Lactose,Vegetariano",
    },
    {
      nome: "Fanta Laranja",
      descricao: "Água mineral sem gás 500ml.",
      preco: "5,00",
      categoria: "Bebidas",
      imagemPrato: "../public/imagemprato.png",
      alergenicos: "Glúten,Lactose,Vegetariano",
    },
  ];

  const handleCategoriaClick = (categoria) => {
    if (categoriasRefs.current[categoria]) {
      const offsetTop = categoriasRefs.current[categoria].offsetTop - 160; // Altura do Header + espaço extra
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setCategoriaVisivel(categoria);
      centralizarCategoria(categoria);
    }
  };

  const centralizarCategoria = (categoria) => {
    const categoriaIndex = categorias.findIndex((cat) => cat === categoria);
    if (categoriasContainerRef.current) {
      const categoryElement =
        categoriasContainerRef.current.children[categoriaIndex];
      const containerWidth = categoriasContainerRef.current.offsetWidth;
      const categoryElementWidth = categoryElement.offsetWidth;
      const scrollLeft =
        categoryElement.offsetLeft -
        containerWidth / 2 +
        categoryElementWidth / 2;
      categoriasContainerRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const categoria = entry.target.id;
            setCategoriaVisivel(categoria);
            centralizarCategoria(categoria);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -75% 0px", // Ajusta a margem inferior para que a área de observação esteja na posição desejada
        threshold: 0.1, // Ajusta o threshold conforme necessário
      }
    );

    Object.values(categoriasRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [categorias]);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          top: 0,
          position: "fixed",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            padding: 1,
            height: 20,
            width: "100%",
            zIndex: 100,
            backgroundColor: "background.secondary",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Adiciona sombra
          }}
        >
          <Typography component="h1" align="left" sx={{ fontSize: "12px" }}>
            Aberto até as 22h - Pedido min. R$20,00
          </Typography>
          <Link to="perfil-da-loja" style={{ color: "inherit" }}>
            <Typography component="h1" align="left" sx={{ fontSize: "12px" }}>
              Ver perfil da loja
            </Typography>
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 64,
            padding: 1,
            backgroundColor: "primary.main",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              src="../public/logo.png"
              alt="Logo do restaurante"
              sx={{ width: 30, height: 30 }}
            />
            <Typography component="h1" align="left" color="text.secondary">
              Restaurante Bom Sabor
            </Typography>
          </Box>
          <IconButton>
            <SearchIcon sx={{ color: "text.secondary" }} />
          </IconButton>
        </Box>
      </Box>
      <Box
        ref={categoriasContainerRef}
        sx={{
          position: "fixed",
          top: "84px",
          width: "100%",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          backgroundColor: "background.secondary",
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          whiteSpace: "nowrap",
          "::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }}
      >
        {categorias.map((categoria, index) => (
          <Box
            key={categoria}
            ref={(el) => (categoriasRefs.current[categoria] = el)}
            onClick={() => handleCategoriaClick(categoria)}
            sx={{
              display: "inline-block",
              marginRight: 3,
              gap: "10px",
              cursor: "pointer",
              padding: 1,
            }}
          >
            <Typography
              component="h1"
              sx={{
                fontWeight: categoriaVisivel === categoria ? "500" : "normal",
                color:
                  categoriaVisivel === categoria
                    ? "primary.main"
                    : "text.primary",
                fontSize: "14px",
              }}
            >
              {categoria}
            </Typography>
          </Box>
        ))}
      </Box>

      <Container
        sx={{
          paddingTop: "180px",
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
            <Divider sx={{ marginTop: "10px" }} />
            <Grid container spacing={2} sx={{ marginTop: "1px" }}>
              {pratos
                .filter((prato) => prato.categoria === categoria)
                .map((prato, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <CardProduto
                      nome={prato.nome}
                      descricao={prato.descricao}
                      preco={prato.preco}
                      imagemPrato={prato.imagemPrato}
                      alergenicos={prato.alergenicos}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        ))}
      </Container>
      <Footer />
    </>
  );
}

export default Home;
