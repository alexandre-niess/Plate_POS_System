import React from "react";
import { Grid, TextField } from "@mui/material";

const StepNomeEndereco = ({ formData, handleChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange({ [name]: value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="nome"
          label="Nome"
          name="nome"
          autoComplete="nome"
          value={formData.nome || ""}
          onChange={handleInputChange}
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
          value={formData.cep || ""}
          onChange={handleInputChange}
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
          value={formData.logradouro || ""}
          onChange={handleInputChange}
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
          value={formData.numero || ""}
          onChange={handleInputChange}
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
          value={formData.bairro || ""}
          onChange={handleInputChange}
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
          value={formData.cidade || ""}
          onChange={handleInputChange}
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
          value={formData.estado || ""}
          onChange={handleInputChange}
        />
      </Grid>
    </Grid>
  );
};

export default StepNomeEndereco;
