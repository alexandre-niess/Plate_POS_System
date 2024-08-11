// SidebarMenu.jsx
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 250;

const SidebarMenu = ({ options, onSelect }) => {
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
          backgroundColor: "primary.main",
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
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <ListItem button onClick={() => onSelect(option)}>
              <ListItemText primary={option} />
              {["Pedidos", "Fidelidade", "Cupons", "Atendimento"].includes(
                option
              ) && (
                <ListItemIcon>
                  <Chip label="EM BREVE" />
                </ListItemIcon>
              )}
            </ListItem>
            {index < options.length - 1 && <Divider />}
          </React.Fragment>
        ))}
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
              keepMounted: true, // Better open performance on mobile.
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
