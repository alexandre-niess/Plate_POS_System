import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { RestaurantContext } from "../src/RestaurantContext"; // Ajuste o caminho conforme necessário

const CardAdmin = () => {
  const { restaurant, loading } = useContext(RestaurantContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!restaurant) {
    return <div>Restaurante não encontrado.</div>;
  }

  const cardData = [
    {
      id: 1,
      title: "Categorias Cadastradas",
      data: restaurant.categorias || [],
    },
    {
      id: 2,
      title: "Formas de Pagamento",
      data: [
        ...(restaurant.pagamentoDinheiro ? ["Dinheiro"] : []),
        ...(restaurant.pagamentoCartao ? [restaurant.cartoes] : []),
      ],
    },
    {
      id: 3,
      title: "Horários de Atendimento",
      data: restaurant.horarios || [],
    },
    {
      id: 4,
      title: "Endereço",
      data: [
        `${restaurant.logradouro}, ${restaurant.numero} - ${restaurant.bairro}, ${restaurant.cidade} - ${restaurant.estado}, ${restaurant.cep}`,
      ],
    },
  ];

  return (
    <Grid container spacing={2} justifyContent="center">
      {cardData.map((card) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
              backgroundColor: "background.secondary",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              textAlign: "center",
              height: "100%",
              border: "1px solid #e0e0e0",
            }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                component="h1"
                sx={{ fontSize: "18px", fontWeight: "600", marginBottom: 2 }}
              >
                {card.title}
              </Typography>
              {card.data.map((item, index) => (
                <Typography
                  key={index}
                  component="p"
                  sx={{ fontSize: "14px", marginBottom: 1 }}
                >
                  {item}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardAdmin;
