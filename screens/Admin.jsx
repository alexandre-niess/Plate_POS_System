import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const cardData = [
  { id: 1, title: "Categorias Cadastradas", data: ["Categoria 1", "Categoria 2", "Categoria 3", "Categoria 4", "Categoria 5", "Categoria 6", "Categoria 7"] },
  { id: 2, title: "Formas de Pagamento", data: ["Cartão de Crédito", "Cartão de Débito", "Dinheiro", "Pix", "Vale Refeição", "Vale Alimentação", "Transferência Bancária"] },
  { id: 3, title: "Horarios de Atendimento", data: ["Seg: 10:00 - 22:00", "Ter: 10:00 - 22:00", "Qua: 10:00 - 22:00", "Qui: 10:00 - 22:00", "Sex: 10:00 - 22:00", "Sáb: 10:00 - 22:00", "Dom: 10:00 - 22:00"] },
  { id: 4, title: "Endereço", data: ["Avenida Dom José Gaspar, 500 - Coração Eucarístico, Belo Horizonte - MG, 30535-901"] }
];

export function Admin() {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '100px',
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {cardData.map((card) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
              <Card
                sx={{
                  padding: 2,
                  backgroundColor: "#f9f9f9", // cor de fundo clara
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // sombra sutil
                  borderRadius: "8px", // bordas arredondadas
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '300px', // altura mínima para todos os cards
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography component="h1" sx={{ fontSize: "18px", fontWeight: "600" }}>
                    {card.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      marginTop: 2,
                      marginBottom: 2,
                      justifyContent: 'center',
                      minHeight: '150px', // altura mínima para a área cinza
                      alignItems: 'center',
                      backgroundColor: "#e0e0e0", // cor de fundo para a área cinza
                      padding: 2,
                      borderRadius: '4px'
                    }}
                  >
                    {card.data.map((item, index) => (
                      <Typography key={index} component="p" sx={{ fontSize: "14px" }}>
                        {item}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: "#ff3d00", // cor de fundo vermelha para o botão
                      color: "white",
                      '&:hover': {
                        backgroundColor: "#e53935", // cor de fundo ao passar o mouse
                      }
                    }}
                  >
                    EDITAR
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Admin;
