import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-browser-router";
import { Avatar } from "@mui/material"; // Importar Avatar para exibir a foto de perfil
import { useContext } from "react";
import { RestaurantContext } from "../src/RestaurantContext"; // Importe o contexto de restaurante

function Header({ headerType }) {
  const { restaurant, loading } = useContext(RestaurantContext); // Use o contexto do restaurante

  const renderHeader = () => {
    if (headerType === "cad-restaurante") {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            height: 64,
            padding: 1,
            backgroundColor: "primary.main",
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            component="h1"
            align="left"
            color="text.white"
            sx={{ marginLeft: 1 }}
          >
            Cadastro de Restaurante
          </Typography>
        </Box>
      );
    }
    if (headerType === "admin1") {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            height: 64,
            padding: 1,
            backgroundColor: "primary.main",
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            component="h1"
            align="left"
            color="text.white"
            sx={{ marginLeft: 1 }}
          >
            Painel do Admin
          </Typography>
        </Box>
      );
    } else if (headerType === "dadosRest") {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            height: 64,
            padding: 1,
            backgroundColor: "primary.main",
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Link to="/AppRestaurante">
            <IconButton>
              <ArrowBackIosIcon sx={{ color: "text.white" }} />
            </IconButton>
          </Link>
          <Typography
            component="h1"
            align="left"
            color="text.white"
            sx={{ marginLeft: 1 }}
          >
            Perfil do Restaurante
          </Typography>
        </Box>
      );
    } else if (headerType === "cad-prato") {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            height: 64,
            padding: 1,
            backgroundColor: "primary.main",
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <IconButton>
            <ArrowBackIosIcon sx={{ color: "text.white" }} />
          </IconButton>

          <Typography
            component="h1"
            align="left"
            color="text.white"
            sx={{ marginLeft: 1 }}
          >
            Cadastro de produtos
          </Typography>
        </Box>
      );
    } else if (headerType === "login") {
      if (loading) {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              height: 64,
              padding: 1,
              backgroundColor: "primary.main",
              width: "100%",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              component="h1"
              align="left"
              color="text.white"
              sx={{ marginLeft: 1 }}
            >
              Carregando...
            </Typography>
          </Box>
        );
      }

      if (!restaurant) {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              height: 64,
              padding: 1,
              backgroundColor: "primary.main",
              width: "100%",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              component="h1"
              align="left"
              color="text.white"
              sx={{ marginLeft: 1 }}
            >
              Dados do restaurante não encontrados
            </Typography>
          </Box>
        );
      }

      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            height: 64,
            padding: 1,
            backgroundColor: "primary.main",
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Link to="/AppRestaurante">
            <IconButton>
              <Avatar src={restaurant.imagemURL} alt="Logo do restaurante" />
            </IconButton>
          </Link>
          <Typography
            component="h1"
            align="left"
            color="text.white"
            sx={{ marginLeft: 1 }}
          >
            {restaurant.nome}
          </Typography>
        </Box>
      );
    } else if (headerType === "login") {
      if (loading) {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              height: 64,
              padding: 1,
              backgroundColor: "primary.main",
              width: "100%",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              component="h1"
              align="left"
              color="text.white"
              sx={{ marginLeft: 1 }}
            >
              Carregando...
            </Typography>
          </Box>
        );
      }

      if (!restaurant) {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              height: 64,
              padding: 1,
              backgroundColor: "primary.main",
              width: "100%",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              component="h1"
              align="left"
              color="text.white"
              sx={{ marginLeft: 1 }}
            >
              Dados do restaurante não encontrados
            </Typography>
          </Box>
        );
      }

      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            height: 64,
            padding: 1,
            backgroundColor: "primary.main",
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Link to="/AppRestaurante">
            <IconButton>
              <Avatar src={restaurant.imagemURL} alt="Logo do restaurante" />
            </IconButton>
          </Link>
          <Typography
            component="h1"
            align="left"
            color="text.white"
            sx={{ marginLeft: 1 }}
          >
            {restaurant.nome}
          </Typography>
        </Box>
      );
    } else if (headerType === "admin") {
      if (loading) {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              height: 64,
              padding: 1,
              backgroundColor: "primary.main",
              width: "100%",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              component="h1"
              align="left"
              color="text.white"
              sx={{ marginLeft: 1 }}
            >
              Carregando...
            </Typography>
          </Box>
        );
      }

      if (!restaurant) {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              height: 64,
              padding: 1,
              backgroundColor: "primary.main",
              width: "100%",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              component="h1"
              align="left"
              color="text.white"
              sx={{ marginLeft: 1 }}
            >
              Dados do restaurante não encontrados
            </Typography>
          </Box>
        );
      }

      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            height: 64,
            padding: 1,
            backgroundColor: "primary.main",
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Link to="/AppRestaurante">
            <IconButton>
              <Avatar src={restaurant.imagemURL} alt="Logo do restaurante" />
            </IconButton>
          </Link>
          <Typography
            component="h1"
            align="left"
            color="text.white"
            sx={{ marginLeft: 1 }}
          >
            Painel do Admin - {restaurant.nome}
          </Typography>
        </Box>
      );
    } else {
      return null; // ou um header padrão
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        {renderHeader()}
      </Box>
    </>
  );
}

export default Header;
