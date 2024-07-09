import React from "react";
import { Box, TextField, Grid } from "@mui/material";

const Step1 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box component="form" sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="nome"
            label="Nome"
            name="nome"
            autoComplete="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="cep"
            label="CEP"
            name="cep"
            autoComplete="cep"
            value={formData.cep}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="logradouro"
            label="Logradouro"
            name="logradouro"
            autoComplete="logradouro"
            value={formData.logradouro}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="numero"
            label="Número"
            name="numero"
            autoComplete="numero"
            value={formData.numero}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="bairro"
            label="Bairro"
            name="bairro"
            autoComplete="bairro"
            value={formData.bairro}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="cidade"
            label="Cidade"
            name="cidade"
            autoComplete="cidade"
            value={formData.cidade}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="estado"
            label="Estado"
            name="estado"
            autoComplete="estado"
            value={formData.estado}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step1;
