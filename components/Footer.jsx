import * as React from "react";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Footer() {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          padding: 2,
          backgroundColor: "background.secondary",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
          borderTop: "4px solid",
          borderColor: "decorations.divider",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid",
            borderColor: "primary.main",
          }}
        >
          <IconButton>
            <MenuBookIcon sx={{ color: "primary.main" }} />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton>
            <ShoppingCartIcon sx={{ color: "text.details" }} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default Footer;
