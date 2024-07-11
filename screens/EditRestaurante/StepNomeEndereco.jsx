import React from "react";
import { Grid, TextField } from "@mui/material";
import { useContext } from "react";
import { RestaurantContext } from "../../src/RestaurantContext";

const StepNomeEndereco = () => {
  const { restaurant, setRestaurant, loading } = useContext(RestaurantContext);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant((prev) => ({ ...prev, [name]: value }));
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
          value={restaurant?.nome || ""}
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
          value={restaurant?.cep || ""}
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
          value={restaurant?.logradouro || ""}
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
          value={restaurant?.numero || ""}
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
          value={restaurant?.bairro || ""}
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
          value={restaurant?.cidade || ""}
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
          value={restaurant?.estado || ""}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default StepNomeEndereco;
