import { createTheme, ThemeProvider, Typography } from "@mui/material";
import { Home } from "../screens/Home";
import { Outlet } from "react-router-dom";

function App() {
  const temaRest = createTheme({
    palette: {
      primary: {
        main: "#F32B10",
      },
      background: {
        default: "#fff",
        secondary: "#f5f5f5",
      },
      text: {
        primary: "#333333",
        secondary: "#8C8C8C",
        white: "#fff",
        details: "#8C8C8C",
      },
      decorations: {
        divider: "#DCDCDC",
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
