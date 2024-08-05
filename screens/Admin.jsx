import React, { useContext } from "react";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { AdminRestaurantContext } from "../src/AdminRestaurantContext"; // Novo contexto
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TabelaProdutos } from "../components/TabelaProdutos";
import Loading from "../components/Loading";

export function Admin() {
  const { restaurant, loading } = useContext(AdminRestaurantContext);

  if (loading) {
    return <Loading />;
  }

  if (!restaurant) {
    return (
      <>
        <Header headerType="admin1" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
            padding: 2,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              marginBottom: "40px",
              fontSize: {
                xs: "1.5rem",
                sm: "1.5rem",
                md: "1.5rem",
                lg: "2rem",
              },
            }}
          >
            Ops, parece que não tem nenhum restaurante aqui...
          </Typography>
          <Link to="/cadastro-restaurante">
            <Button variant="contained">Cadastrar Restaurante</Button>
          </Link>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header headerType="admin" />
      <Box
        sx={{
          margin: "1%",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#D8E0E0",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1%",
            marginTop: "100px",
            padding: "1.5%",
            borderRadius: "8px",
          }}
        >
          <Typography
            component="h1"
            sx={{ fontSize: "18px", fontWeight: "600" }}
          >
            Informações do Restaurante
          </Typography>
          <Link to="/editar-restaurante">
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: { xs: "20px", md: "0" } }}
            >
              Editar informações
            </Button>
          </Link>
        </Box>
        <TabelaProdutos />
      </Box>
    </>
  );
}

export default Admin;
