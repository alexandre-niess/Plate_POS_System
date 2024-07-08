import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-browser-router";

function Header() {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            height: 64,
            padding: 1,
            backgroundColor: "primary.main",
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Link to="/AppRestaurante">
            <IconButton>
              <ArrowBackIosIcon sx={{ color: "text.secondary" }} />
            </IconButton>
          </Link>
          <Typography
            component="h1"
            align="left"
            color="text.secondary"
            sx={{ marginLeft: 1 }}
          >
            Sobre o estabelecimento
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Header;
