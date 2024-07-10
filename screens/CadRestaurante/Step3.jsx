import React, { useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const Step3 = ({ formData, setFormData }) => {
  const refs = {
    segundaMinutoAbertura: useRef(null),
    segundaMinutoFechamento: useRef(null),
    tercaMinutoAbertura: useRef(null),
    tercaMinutoFechamento: useRef(null),
    quartaMinutoAbertura: useRef(null),
    quartaMinutoFechamento: useRef(null),
    quintaMinutoAbertura: useRef(null),
    quintaMinutoFechamento: useRef(null),
    sextaMinutoAbertura: useRef(null),
    sextaMinutoFechamento: useRef(null),
    sabadoMinutoAbertura: useRef(null),
    sabadoMinutoFechamento: useRef(null),
    domingoMinutoAbertura: useRef(null),
    domingoMinutoFechamento: useRef(null),
  };

  const diasSemana = [
    "segunda",
    "terca",
    "quarta",
    "quinta",
    "sexta",
    "sabado",
    "domingo",
  ];

  useEffect(() => {
    // Inicializar formData se não estiver definido
    const initialFormData = { ...formData };
    diasSemana.forEach((dia) => {
      if (!initialFormData.horarios[dia]) {
        initialFormData.horarios[dia] = {
          abertura: { hora: "", minuto: "" },
          fechamento: { hora: "", minuto: "" },
          status: "aberto",
        };
      }
    });
    setFormData(initialFormData);
  }, [formData, setFormData, diasSemana]);

  const handleHorariosChange = (event, dia, tipo, periodo) => {
    const { value } = event.target;
    if (tipo === "hora" && value.length === 2) {
      refs[
        `${dia}Minuto${periodo.charAt(0).toUpperCase() + periodo.slice(1)}`
      ].current.focus();
    }
    setFormData((prevData) => ({
      ...prevData,
      horarios: {
        ...prevData.horarios,
        [dia]: {
          ...prevData.horarios[dia],
          [periodo]: { ...prevData.horarios[dia][periodo], [tipo]: value },
        },
      },
    }));
  };

  const handleRadioChange = (event, dia) => {
    const { value } = event.target;
    if (value === formData.horarios[dia]?.status) {
      // Desmarcar se a mesma opção for clicada novamente
      setFormData((prevData) => ({
        ...prevData,
        horarios: {
          ...prevData.horarios,
          [dia]: {
            ...prevData.horarios[dia],
            status: "aberto",
            abertura: { hora: "", minuto: "" },
            fechamento: { hora: "", minuto: "" },
          },
        },
      }));
    } else {
      const newValues = {
        fechado: { hora: "00", minuto: "00" },
        "24Horas": { hora: "11", minuto: "11" },
        aberto: { hora: "", minuto: "" },
      };
      setFormData((prevData) => ({
        ...prevData,
        horarios: {
          ...prevData.horarios,
          [dia]: {
            ...prevData.horarios[dia],
            status: value,
            abertura: newValues[value] || prevData.horarios[dia].abertura,
            fechamento: newValues[value] || prevData.horarios[dia].fechamento,
          },
        },
      }));
    }
  };

  const getDayLabel = (dia) => {
    if (dia === "sabado" || dia === "domingo") {
      return dia.charAt(0).toUpperCase() + dia.slice(1);
    }
    return dia.charAt(0).toUpperCase() + dia.slice(1) + "-feira";
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
                  {getDayLabel(dia)}
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
                        value={formData.horarios[dia]?.abertura?.hora || ""}
                        onChange={(e) =>
                          handleHorariosChange(e, dia, "hora", "abertura")
                        }
                        size="small"
                        disabled={
                          formData.horarios[dia]?.status === "fechado" ||
                          formData.horarios[dia]?.status === "24Horas"
                        }
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
                        inputRef={refs[`${dia}MinutoAbertura`]}
                        value={formData.horarios[dia]?.abertura?.minuto || ""}
                        onChange={(e) =>
                          handleHorariosChange(e, dia, "minuto", "abertura")
                        }
                        size="small"
                        inputProps={{ maxLength: 2 }}
                        disabled={
                          formData.horarios[dia]?.status === "fechado" ||
                          formData.horarios[dia]?.status === "24Horas"
                        }
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
                        value={formData.horarios[dia]?.fechamento?.hora || ""}
                        onChange={(e) =>
                          handleHorariosChange(e, dia, "hora", "fechamento")
                        }
                        size="small"
                        disabled={
                          formData.horarios[dia]?.status === "fechado" ||
                          formData.horarios[dia]?.status === "24Horas"
                        }
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
                        inputRef={refs[`${dia}MinutoFechamento`]}
                        value={formData.horarios[dia]?.fechamento?.minuto || ""}
                        onChange={(e) =>
                          handleHorariosChange(e, dia, "minuto", "fechamento")
                        }
                        size="small"
                        inputProps={{ maxLength: 2 }}
                        disabled={
                          formData.horarios[dia]?.status === "fechado" ||
                          formData.horarios[dia]?.status === "24Horas"
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12}>
                <RadioGroup
                  row
                  value={formData.horarios[dia]?.status || "aberto"}
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

export default Step3;
