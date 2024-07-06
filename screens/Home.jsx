import * as React from "react";
import Header from "../components/Header";
import CardProduto from "../components/CardProduto";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function Home() {
  useEffect(() => {
    document.title = "Alexandre Niess";
  }, []);

  // Array de sessões
  const sections = [
    "Novidades",
    "Promoções",
    "Combos",
    "Almoço",
    "Jantar",
    "Sobremesas",
    "Bebidas",
  ];

  return (
    <>
      <CssBaseline />
      <Header />
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            overflowX: "auto",
            whiteSpace: "nowrap",
            padding: 1,
            "::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none", // IE and Edge
            "scrollbar-width": "none", // Firefox
          }}
        >
          {sections.map((section) => (
            <Box
              key={section}
              sx={{
                display: "inline-block",
                marginRight: 3,
              }}
            >
              <Typography variant="h6" component="h2">
                {section}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <CardProduto />
    </>
  );
}

export default Home;
