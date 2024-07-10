import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { RestaurantContext } from "../src/RestaurantContext"; // Ajuste o caminho conforme necessário

export function Admin() {
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
      data: restaurant.pagamentoCartao
        ? [
            "Cartão de Crédito",
            "Cartão de Débito",
            "Dinheiro",
            "Pix",
            "Vale Refeição",
            "Vale Alimentação",
            "Transferência Bancária",
          ]
        : [
            "Dinheiro",
            "Pix",
            "Vale Refeição",
            "Vale Alimentação",
            "Transferência Bancária",
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
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {cardData.map((card) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
              <Card
                sx={{
                  padding: 2,
                  backgroundColor: "background.secondary",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "300px",
                  border: "1px solid #e0e0e0",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    component="h1"
                    sx={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    {card.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      marginTop: 2,
                      marginBottom: 2,
                      justifyContent: "center",
                      minHeight: "150px",
                      alignItems: "center",
                      padding: 2,
                      borderRadius: "4px",
                    }}
                  >
                    {card.data.map((item, index) => (
                      <Typography
                        key={index}
                        component="p"
                        sx={{ fontSize: "14px" }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">
                    EDITAR
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
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
            bottom: "20px",
            right: "20px",
          }}
        >
          Cadastrar restaurante
        </Button>
      </Link>
    </>
  );
}

export default Admin;
