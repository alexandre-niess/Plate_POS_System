import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

const logoStyle = {
  width: "70px", // Alterado para 70px para corresponder ao tamanho da imagem atual
  height: "70px",
  cursor: "pointer",
};

function Navbar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <Box
      className="landing-header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        backgroundColor: "primary.main",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 2%",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
        height: 64,
      }}
    >
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <img
          src="/logo.svg"
          alt="Logo"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop if placeholder image is missing
            e.target.src = "https://via.placeholder.com/70"; // Placeholder image URL
          }}
          style={logoStyle}
        />
        <MenuItem
          onClick={() => scrollToSection("features")}
          sx={{ py: "6px", px: "12px" }}
        >
          <Typography variant="body2" sx={{ color: "#fff" }}>
            Funções
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => scrollToSection("testimonials")}
          sx={{ py: "6px", px: "12px" }}
        >
          <Typography variant="body2" sx={{ color: "#fff" }}>
            Opiniões
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => scrollToSection("highlights")}
          sx={{ py: "6px", px: "12px" }}
        >
          <Typography variant="body2" sx={{ color: "#fff" }}>
            Diferencial
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => scrollToSection("faq")}
          sx={{ py: "6px", px: "12px" }}
        >
          <Typography variant="body2" sx={{ color: "#fff" }}>
            FAQ
          </Typography>
        </MenuItem>
      </Box>
      <Box
        className="buttons"
        sx={{
          display: "flex",
          gap: "10px",
        }}
      >
        <Link to="/Login">
          <Button
            color="primary"
            variant="text"
            size="small"
            component="a"
            target="_blank"
            sx={{ color: "#fff" }}
          >
            Entrar
          </Button>
        </Link>
        <Link to="/cadastro">
          <Button
            color="primary"
            variant="contained"
            size="small"
            component="a"
            target="_blank"
          >
            CRIAR CONTA
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Navbar;
