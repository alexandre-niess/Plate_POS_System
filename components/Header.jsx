import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-browser-router";

function Header() {
  return (
    <>
      <Box
        sx={{
          top: 0,
          position: "fixed",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            height: 64,
            padding: 1,
            backgroundColor: "#443399",
            width: "100%",
          }}
        >
          <Link to="/AppRestaurante">
            <IconButton>
              <ArrowBackIosIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" component="h1" align="left">
            Sobre o estabelecimento
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Header;
