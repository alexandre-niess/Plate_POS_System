import React from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";

const StepPagamento = ({ formData, handleChange }) => {
  const handlePagamentoChange = (e) => {
    const { name, checked } = e.target;
    handleChange({ [name]: checked });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange({ [name]: value });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
      <Box sx={{ flex: 1, marginRight: 2 }}>
        <Typography
          component="h2"
          variant="h6"
          sx={{ textAlign: "center", fontSize: "16px", fontWeight: "500" }}
        >
          Formas de pagamento:
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.pagamentoDinheiro || false}
                onChange={handlePagamentoChange}
                name="pagamentoDinheiro"
              />
            }
            label="Dinheiro"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.pagamentoCartao || false}
                onChange={handlePagamentoChange}
                name="pagamentoCartao"
              />
            }
            label="Cartão"
          />
        </Box>
        {formData.pagamentoCartao && (
          <TextField
            margin="normal"
            required
            fullWidth
            id="cartoes"
            label="Cartões"
            name="cartoes"
            autoComplete="cartoes"
            multiline
            rows={2}
            value={formData.cartoes || ""}
            onChange={handleInputChange}
          />
        )}
      </Box>
      <Box sx={{ flex: 1, marginLeft: 2 }}>
        <Typography
          component="h2"
          variant="h6"
          sx={{ textAlign: "center", fontSize: "16px", fontWeight: "500" }}
        >
          Valor Mínimo para Pedido:
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="valorMinimo"
          label="Valor Mínimo para Pedido"
          name="valorMinimo"
          autoComplete="valorMinimo"
          value={formData.valorMinimo || ""}
          onChange={handleInputChange}
        />
      </Box>
    </Box>
  );
};

export default StepPagamento;
