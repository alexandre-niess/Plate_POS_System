import React, { useRef } from "react";
import { Box, Typography, TextField, Grid } from "@mui/material";

const Step3 = ({ formData, setFormData }) => {
  const refs = {
    segundaMinuto: useRef(null),
    tercaMinuto: useRef(null),
    quartaMinuto: useRef(null),
    quintaMinuto: useRef(null),
    sextaMinuto: useRef(null),
    sabadoMinuto: useRef(null),
    domingoMinuto: useRef(null),
  };

  const diasSemana = [
    "segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"
  ];

  const handleHorariosChange = (event, dia, tipo) => {
    const { value } = event.target;
    if (tipo === "hora" && value.length === 2) {
      refs[`${dia}Minuto`].current.focus();
    }
    setFormData((prevData) => ({
      ...prevData,
      horarios: {
        ...prevData.horarios,
        [dia]: { ...prevData.horarios[dia], [tipo]: value },
      },
    }));
  };

  return (
    <Box component="form" sx={{ mt: 3 }}>
      <Typography component="h2" variant="h6" sx={{ textAlign: "center", fontSize: "16px", fontWeight: "500" }}>
        Horarios de Funcionamento:
      </Typography>

      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
        </Grid>
        {diasSemana.map((dia) => (
          <Grid container item spacing={1} key={dia} alignItems="center" justifyContent="center">
            <Grid item xs={4}>
              <Typography component="h2" variant="h6" sx={{ textAlign: "center", fontSize: "16px", fontWeight: "500" }}>
                {dia.charAt(0).toUpperCase() + dia.slice(1)}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                required
                fullWidth
                id={`${dia}-hora`}
                name={`${dia}-hora`}
                autoComplete="off"
                value={formData.horarios[dia].hora}
                onChange={(e) => handleHorariosChange(e, dia, "hora")}
                size="small" // Reduz a altura do campo
              />
            </Grid>
            <Grid item xs={1} align="center">
              <Typography variant="h6">:</Typography>
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                required
                fullWidth
                id={`${dia}-minuto`}
                name={`${dia}-minuto`}
                autoComplete="off"
                inputRef={refs[`${dia}Minuto`]}
                value={formData.horarios[dia].minuto}
                onChange={(e) => handleHorariosChange(e, dia, "minuto")}
                size="small" // Reduz a altura do campo
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Step3;
