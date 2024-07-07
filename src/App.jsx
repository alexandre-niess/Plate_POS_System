import { createTheme, ThemeProvider, Typography } from "@mui/material";
import { Home } from "../screens/Home";
import { Outlet } from "react-router-dom";

function App() {
  const temaRest = createTheme({
    palette: {
      primary: {
        main: "#F32B10", // master orange
      },
      background: {
        default: "#fff", // Cor de fundo padrão
        secondary: "#f5f5f5", //cor de fundo secundária
      },
      text: {
        primary: "#333333", // Cor principal do texto
        secondary: "#701407", // Cor secundária do texto
      },
    },
    shape: {
      borderRadius: 4,
    },
    typography: {
      fontFamily: "Lexend, sans-serif",
    },
  });

  return (
    <>
      <ThemeProvider theme={temaRest}>
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
