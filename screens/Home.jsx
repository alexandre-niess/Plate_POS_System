import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import CardProduto from "../components/CardProduto";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import { Avatar, TextField, InputAdornment } from "@mui/material";
import Footer from "../components/Footer";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../src/firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

export function Home() {
  const [categoriaVisivel, setCategoriaVisivel] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pratos, setPratos] = useState([]);
  const categoriasRefs = useRef({});
  const categoriasContainerRef = useRef(null);

  useEffect(() => {
    const fetchPratos = async () => {
      const pratosCollection = collection(db, "Pratos");
      const pratosSnapshot = await getDocs(pratosCollection);
      const pratosList = pratosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPratos(pratosList);
    };

    fetchPratos();
  }, []);

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

  const handleSearchIconClick = () => {
    setSearchMode(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClose = () => {
    setSearchMode(false);
    setSearchQuery("");
  };

  const filteredPratos = searchQuery
    ? pratos.filter(
        (prato) =>
          prato.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prato.descricao.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pratos;

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
  }, [categorias, searchQuery, filteredPratos]);

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
          {searchMode ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ width: "100%" }}
            >
              <TextField
                variant="outlined"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-root": {
                    height: "40px", // Ajuste a altura conforme necessário
                  },
                  borderRadius: 1,
                }}
                InputProps={{
                  style: {
                    height: "40px", // Ajuste a altura conforme necessário
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearchClose}>
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </motion.div>
          ) : (
            <>
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
                <Typography component="h1" align="left" color="text.white">
                  Restaurante Bom Sabor
                </Typography>
              </Box>
              <IconButton onClick={handleSearchIconClick}>
                <SearchIcon sx={{ color: "text.white" }} />
              </IconButton>
            </>
          )}
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
        {!searchQuery || filteredPratos.length > 0
          ? categorias.map((categoria, index) => (
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
                    fontWeight:
                      categoriaVisivel === categoria ? "500" : "normal",
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
            ))
          : null}
      </Box>

      <Container
        sx={{
          paddingTop: "180px",
          paddingBottom: "16px",
        }}
      >
        {filteredPratos.length === 0 ? (
          <Box sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6" component="p">
              Nenhum resultado encontrado.
            </Typography>
          </Box>
        ) : (
          categorias.map((categoria) => (
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
                {filteredPratos
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
          ))
        )}
      </Container>
      <Footer />
    </>
  );
}

export default Home;
