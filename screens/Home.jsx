import React from "react";
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import CardProduto from "../components/CardProduto";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
  ];

  useEffect(() => {
    document.title = "Alexandre Niess";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCategoriaVisivel(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    categorias.forEach((categoria) => {
      if (categoriasRefs.current[categoria]) {
        observer.observe(categoriasRefs.current[categoria]);
      }
    });

    return () => {
      categorias.forEach((categoria) => {
        if (categoriasRefs.current[categoria]) {
          observer.unobserve(categoriasRefs.current[categoria]);
        }
      });
    };
  }, [categorias]);

  useEffect(() => {
    if (categoriaVisivel && categoriasRefs.current[categoriaVisivel]) {
      const categoriaElement = categoriasRefs.current[categoriaVisivel];
      const containerElement = containerRef.current;

      const categoriaRect = categoriaElement.getBoundingClientRect();
      const containerRect = containerElement.getBoundingClientRect();
      const scrollLeft =
        categoriaElement.offsetLeft -
        containerRect.width / 4 +
        categoriaRect.width / 4;

      containerElement.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [categoriaVisivel]);

  const handleCategoriaClick = (categoria) => {
    if (categoriasRefs.current[categoria]) {
      const offsetTop = categoriasRefs.current[categoria].offsetTop - 160; // Altura do Header + espaço extra
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
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

      <Box
        sx={{
          padding: "160px 16px 16px 16px", // Ajuste conforme necessário
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginTop: 2,
              }}
            >
              {pratos
                .filter((prato) => prato.categoria === categoria)
                .map((prato, index) => (
                  <CardProduto
                    key={index}
                    nome={prato.nome}
                    descricao={prato.descricao}
                    preco={prato.preco}
                    categoria={prato.categoria}
                  />
                ))}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default Home;
