import React from "react";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Step2 = ({ formData, setFormData }) => {
  const handlePagamentoChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box component="form" sx={{ mt: 3 }}>
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
              checked={formData.pagamentoDinheiro}
              onChange={handlePagamentoChange}
              name="pagamentoDinheiro"
            />
          }
          label="Dinheiro"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.pagamentoCartao}
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
          value={formData.cartoes}
          onChange={handleInputChange}
        />
      )}
      <Typography
        component="h2"
        variant="h6"
        sx={{
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "500",
          marginTop: "30px",
        }}
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
        value={formData.valorMinimo}
        onChange={handleInputChange}
      />
      <Typography
        component="h2"
        variant="h6"
        sx={{
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "500",
          marginTop: "30px",
        }}
      >
        Foto de Perfil do Restaurante:
      </Typography>
      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
      >
        <Box sx={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          Upload Imagem
          <CloudUploadIcon />
        </Box>
        <input
          type="file"
          hidden
          onChange={(e) => {
            const file = e.target.files[0];
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
            if (file && allowedTypes.includes(file.type)) {
              setFormData((prevData) => ({
                ...prevData,
                imagem: file,
                imagemNome: file.name,
              }));
            } else {
              setFormData((prevData) => ({
                ...prevData,
                imagem: null,
                imagemNome: "",
              }));
              alert(
                "Por favor, selecione um arquivo de imagem válido (jpeg, png, gif)."
              );
            }
          }}
        />
      </Button>
      {formData.imagemNome && (
        <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
          Arquivo selecionado: {formData.imagemNome}
        </Typography>
      )}
    </Box>
  );
};

export default Step2;
