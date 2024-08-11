// Restaurant.jsx
import React from "react";
import {
  Typography,
  Box,
  Grid,
  Avatar,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const Restaurante = ({ restaurant }) => {
  console.log(restaurant);
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Restaurante
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="restaurant tabs"
      >
        <Tab label="Dados Gerais" />
        <Tab label="Horários de Funcionamento" />
      </Tabs>

      {tabIndex === 0 && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" flexDirection="column">
                  <Avatar
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="Logo"
                    sx={{ width: 120, height: 120 }}
                  />
                  <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                    Plate Restaurante
                  </Typography>
                  <Typography variant="body2" align="center">
                    Plate Restaurante oferece uma experiência gastronômica
                    sofisticada e acolhedora, onde pratos cuidadosamente
                    preparados com ingredientes frescos destacam-se em um
                    ambiente elegante. Localizado no coração da cidade, celebra
                    sabores locais e internacionais, proporcionando momentos
                    memoráveis com serviço impecável e uma atmosfera única.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Endereço
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField label="CEP" fullWidth sx={{ mb: 2 }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Logradouro" fullWidth sx={{ mb: 2 }} />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField label="Número" fullWidth sx={{ mb: 2 }} />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField label="Complemento" fullWidth sx={{ mb: 2 }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Bairro" fullWidth sx={{ mb: 2 }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Cidade" fullWidth sx={{ mb: 2 }} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ p: 2, mt: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Pagamento
                </Typography>
                <FormControlLabel
                  control={<Checkbox name="dinheiro" />}
                  label="Dinheiro"
                />
                <FormControlLabel
                  control={<Checkbox name="cartoes" />}
                  label="Cartões"
                />
                <Typography variant="body2" color="textSecondary">
                  Cartões de Crédito e Débito (Visa e MasterCard), Ticket de
                  Alimentação e Refeição
                </Typography>
              </CardContent>
            </Card>

            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Editar Informações
            </Button>
          </Grid>
        </Grid>
      )}

      {tabIndex === 1 && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Horários de Funcionamento
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {[
              "Segunda-feira",
              "Terça-feira",
              "Quarta-feira",
              "Quinta-feira",
            ].map((day) => (
              <Card key={day} sx={{ p: 2, mb: 2 }}>
                <CardContent>
                  <Typography variant="body1">{day}</Typography>
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid item xs={3}>
                      <TextField label="Abre" defaultValue="11:00" fullWidth />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField label="Fecha" defaultValue="23:00" fullWidth />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        label="Reabre"
                        defaultValue="00:00"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField label="Fecha" defaultValue="00:00" fullWidth />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            {["Sexta-feira", "Sábado", "Domingo", "Feriado"].map((day) => (
              <Card key={day} sx={{ p: 2, mb: 2 }}>
                <CardContent>
                  <Typography variant="body1">{day}</Typography>
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid item xs={3}>
                      <TextField label="Abre" defaultValue="11:00" fullWidth />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField label="Fecha" defaultValue="23:00" fullWidth />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        label="Reabre"
                        defaultValue="00:00"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField label="Fecha" defaultValue="00:00" fullWidth />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Editar Informações
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Restaurante;
