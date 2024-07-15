import React, { useState, useRef, useEffect, useContext } from "react";
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
import { usePratos } from "../src/PratoContext";
import { RestaurantContext } from "../src/RestaurantContext";
import IsOpen from "/components/IsOpen.jsx";
import Loading from "../components/Loading";

export function Home() {
  const { pratos, loading: pratosLoading } = usePratos();
  const { restaurant, loading: restaurantLoading } =
    useContext(RestaurantContext);
  const [categoriaVisivel, setCategoriaVisivel] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const categoriasRefs = useRef({});
  const categoriasContainerRef = useRef(null);

  const handleCategoriaClick = (categoria) => {
    if (categoriasRefs.current[categoria]) {
      const offsetTop = categoriasRefs.current[categoria].offsetTop - 160;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setCategoriaVisivel(categoria);
      centralizarCategoria(categoria);
    }
  };

  const centralizarCategoria = (categoria) => {
    const categoriaIndex = restaurant.categorias.findIndex(
      (cat) => cat === categoria
    );
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
        rootMargin: "0px 0px -75% 0px",
        threshold: 0.1,
      }
    );

    if (restaurant && restaurant.categorias) {
      Object.values(categoriasRefs.current).forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [restaurant, searchQuery, filteredPratos]);

  if (restaurantLoading) {
    return <Loading />;
  }

  return (
    <>
      <CssBaseline />
      <Box sx={{ top: 0, position: "fixed", width: "100%" }}>
        <IsOpen />
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
                    height: "40px",
                  },
                  borderRadius: 1,
                }}
                InputProps={{
                  style: { height: "40px" },
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
                {restaurantLoading ? (
                  <Loading />
                ) : (
                  <>
                    <Avatar
                      src={restaurant.imagemURL}
                      alt="Logo do restaurante"
                      sx={{ width: 30, height: 30 }}
                    />
                    <Typography component="h1" align="left" color="text.white">
                      {restaurant.nome}
                    </Typography>
                  </>
                )}
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
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {!searchQuery || filteredPratos.length > 0
          ? restaurant.categorias.map((categoria, index) => (
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

      <Container sx={{ paddingTop: "180px", paddingBottom: "100px" }}>
        {pratosLoading ? (
          <Loading />
        ) : filteredPratos.length === 0 ? (
          <Box sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6" component="p">
              Nenhum resultado encontrado.
            </Typography>
          </Box>
        ) : (
          restaurant.categorias.map((categoria) => (
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
