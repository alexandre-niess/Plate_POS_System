import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Chip,
  ListItemIcon,
  Box,
  Avatar,
  Typography,
  Divider,
  IconButton,
  AppBar,
  Toolbar,
  Hidden,
  useTheme, // Importando useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import icons from "../../components/Icons"; // Certifique-se de que o caminho esteja correto

const drawerWidth = 300;

const SidebarMenu = ({ options, onSelect, activeScreen }) => {
  const theme = useTheme(); // Usando useTheme para acessar as variáveis do tema
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 2,
          backgroundColor: theme.palette.primary.main, // Usando o tema
          color: "white",
        }}
      >
        <Avatar
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Logo"
        />
        <Typography variant="h6">Admin</Typography>
      </Box>
      <List>
        {options.map((option, index) => {
          const IconComponent = icons[option.icon]; // Recupera o ícone correspondente
          const isActive = activeScreen === option.label;
          const iconColor = isActive
            ? theme.palette.primary.main // Cor ativa
            : theme.palette.text.secondary; // Cor inativa (cinza)

          return (
            <React.Fragment key={index}>
              <ListItem button onClick={() => onSelect(option.label)}>
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  {" "}
                  {/* Ajuste o valor conforme necessário */}
                  <IconComponent color={iconColor} />{" "}
                  {/* Ícone dinâmico com cor */}
                </ListItemIcon>
                <ListItemText
                  primary={option.label}
                  sx={{
                    color: isActive
                      ? theme.palette.primary.main // Cor ativa
                      : theme.palette.text.secondary, // Cor inativa
                  }}
                />
                {["Pedidos", "Fidelidade", "Cupons", "Atendimento"].includes(
                  option.label
                ) && (
                  <ListItemIcon>
                    <Chip label="EM BREVE" />
                  </ListItemIcon>
                )}
              </ListItem>
              {index < options.length - 1 && <Divider />}
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Hidden mdUp>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap>
              Restaurante Admin
            </Typography>
          </Toolbar>
        </AppBar>
      </Hidden>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                borderTopRightRadius: 40,
                borderBottomRightRadius: 40,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </Box>
    </Box>
  );
};

export default SidebarMenu;
