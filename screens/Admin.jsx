import React, { useContext } from "react";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { RestaurantContext } from "../src/RestaurantContext"; // Ajuste o caminho conforme necessário
import Button from "@mui/material/Button";
import CardAdmin from "../components/CardAdmin"; // Importe o componente CardAdmin
import Typography from "@mui/material/Typography";

export function Admin() {
  const { restaurant, loading } = useContext(RestaurantContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!restaurant) {
    return (
      <>
        <Header />
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
          <Link to="/AppRestaurante/cadastro-restaurante">
            <Button variant="contained">Cadastrar Restaurante</Button>
          </Link>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header />
      <Box sx={{ margin: "1%" }}>
        <Box
          sx={{
            backgroundColor: "#D8E0E0",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",

            marginTop: "140px",
            padding: "1.5%",
            borderRadius: "8px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              margin: { xs: "40px 0 20px", md: "40px 0" },
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Informações do Restaurante
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: { xs: "20px", md: "0" } }}
          >
            Editar informações
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "1%",
          }}
        >
          <CardAdmin />
        </Box>
        <Link to="/AppRestaurante/cad-prato">
          <Button
            variant="contained"
            sx={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
            }}
          >
            Adicionar produto
          </Button>
        </Link>
        <Link to="/AppRestaurante/cadastro-restaurante">
          <Button
            variant="contained"
            sx={{
              position: "fixed",
              bottom: "20px",
              right: "140px",
            }}
          >
            Cadastrar restaurante
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default Admin;
