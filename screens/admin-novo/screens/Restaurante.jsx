import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Avatar,
  Card,
  CardContent,
  Tabs,
  Tab,
  TextField,
  FormControlLabel,
  Checkbox,
  Fab,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore"; // Importação para buscar dados do Firestore
import { getAuth } from "firebase/auth"; // Para autenticação do usuário
import { db } from "../../../firebaseConfig"; // Certifique-se de que o caminho está correto
import EditIcon from "@mui/icons-material/Edit";

const Restaurante = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null); // Estado para gerenciar erros
  const [loading, setLoading] = useState(true); // Estado para carregamento

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
          throw new Error("Usuário não autenticado.");
        }

        const userId = currentUser.uid;

        // Busca o idRest na coleção 'admins' baseado no userId
        const adminDocRef = doc(db, "admins", userId);
        const adminDocSnap = await getDoc(adminDocRef);

        if (!adminDocSnap.exists()) {
          throw new Error("Administrador não encontrado.");
        }

        const { idRest } = adminDocSnap.data(); // Obtém o idRest da coleção admins

        if (!idRest) {
          throw new Error(
            "ID do restaurante não encontrado no documento do admin."
          );
        }

        // Busca os dados do restaurante usando o idRest
        const restaurantDocRef = doc(db, "Restaurantes", idRest);
        const restaurantDocSnap = await getDoc(restaurantDocRef);

        if (restaurantDocSnap.exists()) {
          setRestaurant(restaurantDocSnap.data()); // Atualiza o estado com os dados do restaurante
        } else {
          throw new Error("Restaurante não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do restaurante: ", error);
        setError(error.message); // Define a mensagem de erro
      } finally {
        setLoading(false); // Indica que o carregamento terminou
      }
    };

    fetchRestaurant();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  if (loading) {
    return <Typography>Carregando dados...</Typography>; // Exibe uma mensagem de carregamento
  }

  if (error) {
    return <Typography color="error">Erro: {error}</Typography>;
  }

  if (!restaurant) {
    return <Typography>Nenhum restaurante encontrado.</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 10,
          backgroundColor: "background.secondary",
          boxShadow: (theme) =>
            `0px 20px 20px -15px ${theme.palette.background.secondary}`, // Usa a cor do tema
        }}
      >
        {/* Contêiner para o título, ocultado em telas pequenas */}
        <Typography
          variant="h4"
          sx={{
            marginTop: "30px",
            display: { xs: "none", sm: "block" }, // Oculta em telas pequenas
          }}
        >
          Restaurante
        </Typography>

        {/* Contêiner para as abas, com scroll horizontal em telas pequenas */}
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="restaurant tabs"
          variant="scrollable" // Permite o scroll horizontal
          scrollButtons="auto" // Mostra botões de scroll se necessário
          sx={{
            marginTop: { xs: "60px", sm: "0px" }, // Ajusta o espaçamento entre o título e as abas
            borderBottom: 1,
            borderColor: "divider", // Define a linha inferior
            overflowX: "auto", // Adiciona scroll horizontal
          }}
        >
          <Tab label="Dados Gerais" />
          <Tab label="Horários de Funcionamento" />
        </Tabs>
      </Box>

      {tabIndex === 0 && (
        <Box sx={{ marginTop: "100px" }}>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {/* Esquerda */}
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2 }}>
                <CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Avatar
                      src={
                        restaurant.imagemURL ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="Logo"
                      sx={{ width: 120, height: 120 }}
                    />
                    <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                      {restaurant.nome || "Nome do Restaurante"}
                    </Typography>
                    <Typography variant="body2" align="center">
                      {restaurant.descricao ||
                        "Plate Restaurante oferece uma experiência gastronômica sofisticada e acolhedora, onde pratos cuidadosamente preparados com ingredientes frescos destacam-se em um ambiente elegante. Localizado no coração da cidade, celebra sabores locais e internacionais, proporcionando momentos memoráveis com serviço impecável e uma atmosfera única."}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Direita */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                {/* Endereço */}
                <Grid item xs={12}>
                  <Card sx={{ p: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Endereço
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="CEP"
                            fullWidth
                            value={restaurant.cep || ""}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Logradouro"
                            fullWidth
                            value={restaurant.logradouro || ""}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            label="Número"
                            fullWidth
                            value={restaurant.numero || ""}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <TextField
                            label="Complemento"
                            fullWidth
                            value={restaurant.complemento || ""}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Bairro"
                            fullWidth
                            value={restaurant.bairro || ""}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Cidade"
                            fullWidth
                            value={restaurant.cidade || ""}
                            disabled
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Pagamento */}
                <Grid item xs={12}>
                  <Card sx={{ p: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Pagamento
                      </Typography>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={restaurant.pagamentoDinheiro || false}
                            disabled
                          />
                        }
                        label="Dinheiro"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={restaurant.pagamentoCartao || false}
                            disabled
                          />
                        }
                        label={`Cartões (${restaurant.cartoes})`}
                      />
                    </CardContent>
                  </Card>
                </Grid>

                {/* Contato */}
                <Grid item xs={12}>
                  <Card sx={{ p: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Contato
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Telefone"
                            fullWidth
                            value={restaurant.telefone || ""}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="E-mail"
                            fullWidth
                            value={restaurant.email || ""}
                            disabled
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Redes Sociais */}
                <Grid item xs={12}>
                  <Card sx={{ p: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Redes Sociais
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Facebook"
                            fullWidth
                            value={restaurant.facebook || ""}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Instagram"
                            fullWidth
                            value={restaurant.instagram || ""}
                            disabled
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Tema */}
                <Grid item xs={12}>
                  <Card sx={{ p: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Tema
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}

      {tabIndex === 1 && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Horários de Funcionamento
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {restaurant.horarios?.map((horario, index) => (
              <Card key={index} sx={{ p: 2, mb: 2 }}>
                <CardContent>
                  <Typography variant="body1">{horario}</Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      )}
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {" "}
        Editar{" "}
        <EditIcon
          sx={{ marginLeft: "10px", height: "50%", width: "auto" }}
        />{" "}
      </Fab>
    </Box>
  );
};

export default Restaurante;
