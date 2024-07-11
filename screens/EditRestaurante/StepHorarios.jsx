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

const diasSemana = [
  "domingo",
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
];

const parseHorario = (horarioStr) => {
  if (horarioStr.includes("Fechado")) {
    return { status: "fechado" };
  }

  if (horarioStr.includes("24 horas")) {
    return { status: "24Horas" };
  }

  const [dia, horario] = horarioStr.split(": ");
  const [abertura, fechamento] = horario.split(" às ");
  const [aberturaHora, aberturaMinuto] = abertura.split(":");
  const [fechamentoHora, fechamentoMinuto] = fechamento.split(":");

  return {
    status: "aberto",
    abertura: { hora: aberturaHora, minuto: aberturaMinuto },
    fechamento: { hora: fechamentoHora, minuto: fechamentoMinuto },
  };
};

const StepHorarios = ({ formData, handleChange }) => {
  const horarios = diasSemana.reduce((acc, dia) => {
    const horarioStr =
      formData.horarios?.find((h) => h.startsWith(dia)) || `${dia}: Fechado`;
    acc[dia] = parseHorario(horarioStr);
    return acc;
  }, {});

  const handleHorariosChange = (e, dia, type, period) => {
    const { value } = e.target;
    handleChange({
      horarios: formData.horarios.map((h) =>
        h.startsWith(dia)
          ? `${dia}: ${
              period === "abertura" ? value : horarios[dia].abertura.hora
            }:${horarios[dia].abertura.minuto} às ${
              period === "fechamento" ? value : horarios[dia].fechamento.hora
            }:${horarios[dia].fechamento.minuto}`
          : h
      ),
    });
  };

  const handleRadioChange = (e, dia) => {
    const { value } = e.target;
    handleChange({
      horarios: formData.horarios.map((h) =>
        h.startsWith(dia)
          ? value === "fechado"
            ? `${dia}: Fechado`
            : value === "24Horas"
            ? `${dia}: 24 horas`
            : `${dia}: ${horarios[dia].abertura.hora}:${horarios[dia].abertura.minuto} às ${horarios[dia].fechamento.hora}:${horarios[dia].fechamento.minuto}`
          : h
      ),
    });
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
                        value={horarios[dia]?.abertura?.hora || ""}
                        onChange={(e) =>
                          handleHorariosChange(e, dia, "hora", "abertura")
                        }
                        size="small"
                        disabled={horarios[dia]?.status !== "aberto"}
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
                        value={horarios[dia]?.abertura?.minuto || ""}
                        onChange={(e) =>
                          handleHorariosChange(e, dia, "minuto", "abertura")
                        }
                        size="small"
                        inputProps={{ maxLength: 2 }}
                        disabled={horarios[dia]?.status !== "aberto"}
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
                        value={horarios[dia]?.fechamento?.hora || ""}
                        onChange={(e) =>
                          handleHorariosChange(e, dia, "hora", "fechamento")
                        }
                        size="small"
                        disabled={horarios[dia]?.status !== "aberto"}
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
                        value={horarios[dia]?.fechamento?.minuto || ""}
                        onChange={(e) =>
                          handleHorariosChange(e, dia, "minuto", "fechamento")
                        }
                        size="small"
                        inputProps={{ maxLength: 2 }}
                        disabled={horarios[dia]?.status !== "aberto"}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12}>
                <RadioGroup
                  row
                  value={horarios[dia]?.status || "aberto"}
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
