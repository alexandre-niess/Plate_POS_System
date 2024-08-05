import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentsIcon from "@mui/icons-material/Payments";
import { RestaurantContext } from "../src/RestaurantContext"; // Importe o contexto de restaurante
import Loading from "../components/Loading";

export function PerfilEmp() {
  const { restaurantName } = useParams();
  const { restaurant, loading, fetchRestaurantByName } =
    useContext(RestaurantContext);

  useEffect(() => {
    if (restaurantName && (!restaurant || restaurant.nome !== restaurantName)) {
      fetchRestaurantByName(restaurantName);
    }
  }, [restaurantName, restaurant, fetchRestaurantByName]);

  if (loading) {
    return (
      <>
        <CssBaseline />
        <Header headerType="dadosRest" />
        <Loading />
      </>
    );
  }

  if (!restaurant) {
    return (
      <>
        <CssBaseline />
        <Header headerType="dadosRest" />
        <Box sx={{ marginTop: "74px", textAlign: "center" }}>
          <Typography component="h1" variant="h6" color="text.primary">
            Dados do restaurante não encontrados.
          </Typography>
        </Box>
      </>
    );
  }

  const {
    imagemURL,
    nome,
    endereco = {},
    horarios = [],
    pagamentoDinheiro,
    pagamentoCartao,
    cartoes = [],
    logradouro = "",
    numero = "",
    bairro = "",
    cidade = "",
    estado = "",
    cep = "",
  } = restaurant;

  return (
    <>
      <CssBaseline />
      <Header headerType="dadosRest" />
      <Box sx={{ marginTop: "74px" }}>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            marginBottom: "10px",
            alignItems: "center",
            padding: 1.5,
          }}
        >
          <Avatar
            src={imagemURL}
            alt="Logo do restaurante"
            sx={{ width: 50, height: 50 }}
          />
          <Typography
            component="h1"
            variant="h6"
            align="left"
            color="text.primary"
          >
            {nome}
          </Typography>
        </Box>
        <Section title="Endereço">
          <Typography
            component="h1"
            color="text.details"
            sx={{ fontSize: "12px" }}
          >
            {logradouro}, {numero} - {bairro}, {cidade} - {estado}, {cep}
          </Typography>
        </Section>
        <Section title="Formas de Pagamento">
          {pagamentoDinheiro && (
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <PaymentsIcon />
              <Typography
                component="h1"
                align="left"
                color="text.primary"
                sx={{ fontWeight: "600", fontSize: "12px" }}
              >
                Dinheiro
              </Typography>
            </Box>
          )}
          {pagamentoCartao && Array.isArray(cartoes) && cartoes.length > 0 && (
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <CreditCardIcon />
              <Typography
                component="h1"
                align="left"
                color="text.primary"
                sx={{ fontWeight: "600", fontSize: "12px" }}
              >
                Cartões:
              </Typography>
              <Typography
                component="h1"
                align="left"
                color="text.details"
                sx={{ fontSize: "12px" }}
              >
                {cartoes.join(", ")}
              </Typography>
            </Box>
          )}
        </Section>
        <Section title="Horário de Funcionamento">
          {horarios.map((horario, index) => (
            <Typography
              key={index}
              component="h1"
              align="left"
              color="text.details"
              sx={{ fontSize: "12px" }}
            >
              {horario}
            </Typography>
          ))}
        </Section>
      </Box>
    </>
  );
}

function Section({ title, children }) {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "background.secondary",
          padding: 1.5,
        }}
      >
        <Typography component="h1" sx={{ fontSize: "14px" }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", padding: 1.5 }}>{children}</Box>
    </>
  );
}

export default PerfilEmp;
