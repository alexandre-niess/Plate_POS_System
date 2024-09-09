import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import icons from "../../../components/Icons"; // Certifique-se de que o caminho esteja correto

const Construction = ({ isActive }) => {
  const theme = useTheme(); // Para acessar o tema MUI
  const IconComponent = icons["IconSeven"]; // Declare a variável do ícone

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Ocupa a altura total da tela
        textAlign: "center", // Centraliza o texto
        gap: 4,
      }}
    >
      <Box
        sx={{
          width: "350px",
          height: "auto",
        }}
      >
        <IconComponent color={theme.palette.primary.main} />
      </Box>
      <Typography variant="h5">Em construção</Typography>
    </Box>
  );
};

export default Construction;
