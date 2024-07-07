import { createTheme, ThemeProvider, Typography } from "@mui/material";
import { Home } from "../screens/Home";
import { Outlet } from "react-router-dom";

function App() {
  const temaRest = createTheme({
    palette: {
      primary: {
        main: "#443399",
      },
      secondary: {
        main: "#88AA55",
      },
      text: {
        default: "#242424",
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
