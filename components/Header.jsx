import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShareIcon from "@mui/icons-material/Share";

function Header() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 64,
          padding: 1,
          backgroundColor: "#443399",
          width: "100%",
          position: "fixed",
          top: 0,
          zIndex: 1,
        }}
      >
        <Typography variant="h6" component="h1" align="left">
          Restaurante Bom Sabor
        </Typography>
        <Box>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default Header;
