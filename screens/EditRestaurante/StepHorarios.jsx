import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material";
import { useContext } from "react";
import { RestaurantContext } from "../../src/RestaurantContext";

const diasSemana = [
  "domingo",
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
];

const StepHorarios = () => {
  const { restaurant, setRestaurant, loading } = useContext(RestaurantContext);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const handleHorariosChange = (e, dia, type, period) => {
    const { value } = e.target;
    setRestaurant((prev) => ({
      ...prev,
      horarios: {
        ...prev.horarios,
        [dia]: {
          ...prev.horarios[dia],
          [period]: {
            ...prev.horarios[dia][period],
            [type]: value,
          },
        },
      },
    }));
  };

  const handleRadioChange = (e, dia) => {
    const { value } = e.target;
    setRestaurant((prev) => ({
      ...prev,
      horarios: {
        ...prev.horarios,
        [dia]: {
          ...prev.horarios[dia],
          status: value,
        },
      },
    }));
  };

  return (
    <Box component="form" sx={{ mt: 3, opacity: 0.8 }}>
      <Typography
        component="h2"
        variant="h6"
        sx={{ textAlign: "center", fontSize: "16px", fontWeight: "500" }}
      >
        Horários de Funcionamento:
      </Typography>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        {diasSemana.map((dia, index) => (
          <React.Fragment key={dia}>
            <Grid
              container
              item
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} sm={3}>
                <Typography
                  component="h2"
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  {dia.charAt(0).toUpperCase() + dia.slice(1)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    backgroundColor: "#f0f0f0",
                    padding: 1,
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    component="p"
                    variant="body1"
                    sx={{ textAlign: "center" }}
                  >
                    Abertura
                  </Typography>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item xs={5}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id={`${dia}-hora-abertura`}
                        name={`${dia}-hora-abertura`}
                        autoComplete="off"
                        value={
                          restaurant?.horarios?.[dia]?.abertura?.hora || ""
                        }
                        onChange={(e) =>
                          handleHorariosChange(e, dia, "hora", "abertura")
                        }
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={2} align="center">
                      <Typography variant="h6">:</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id={`${dia}-minuto-abertura`}
                        name={`${dia}-minuto-abertura`}
                        autoComplete="off"
                        value={
                          restaurant?.horarios?.[dia]?.abertura?.minuto || ""
                        }
                        onChange={(e) =>
                          handleHorariosChange(e, dia, "minuto", "abertura")
                        }
                        size="small"
                        inputProps={{ maxLength: 2 }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    backgroundColor: "#f0f0f0",
                    padding: 1,
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    component="p"
                    variant="body1"
                    sx={{ textAlign: "center" }}
                  >
                    Fechamento
                  </Typography>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item xs={5}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id={`${dia}-hora-fechamento`}
                        name={`${dia}-hora-fechamento`}
                        autoComplete="off"
                        value={
                          restaurant?.horarios?.[dia]?.fechamento?.hora || ""
                        }
                        onChange={(e) =>
                          handleHorariosChange(e, dia, "hora", "fechamento")
                        }
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={2} align="center">
                      <Typography variant="h6">:</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id={`${dia}-minuto-fechamento`}
                        name={`${dia}-minuto-fechamento`}
                        autoComplete="off"
                        value={
                          restaurant?.horarios?.[dia]?.fechamento?.minuto || ""
                        }
                        onChange={(e) =>
                          handleHorariosChange(e, dia, "minuto", "fechamento")
                        }
                        size="small"
                        inputProps={{ maxLength: 2 }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12}>
                <RadioGroup
                  row
                  value={restaurant?.horarios?.[dia]?.status || "aberto"}
                  onChange={(e) => handleRadioChange(e, dia)}
                >
                  <FormControlLabel
                    value="aberto"
                    control={<Radio />}
                    label="Aberto"
                  />
                  <FormControlLabel
                    value="fechado"
                    control={<Radio />}
                    label="Fechado"
                  />
                  <FormControlLabel
                    value="24Horas"
                    control={<Radio />}
                    label="24 horas"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            {index < diasSemana.length - 1 && (
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default StepHorarios;
