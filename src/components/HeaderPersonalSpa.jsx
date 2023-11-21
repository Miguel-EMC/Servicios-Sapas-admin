import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Icono de cerrar sesión

const HeaderPersonalSpa = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const navigate = useNavigate(); // Utilizando useNavigate para la navegación

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Botón para abrir el Drawer */}
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          {/* Contenido del encabezado */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Servicios Spas
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer lateral */}
      <Drawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
        <List>
          {/* Ítems del menú */}
          <ListItem button component={Link} to="/home" onClick={handleDrawerClose}>
            <ListItemText primary="Inicio" />
          </ListItem>
          <ListItem button component={Link} to="/servicesSpa" onClick={handleDrawerClose}>
            <ListItemText primary="Servicios" />
          </ListItem>
          {/* Separador */}
          <Divider />
          {/* Opción de cerrar sesión */}
          <ListItem button onClick={handleLogout} sx={{ py: 2 }}>
            <ListItemIcon>
              <ExitToAppIcon sx={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }} primary="Cerrar sesión" />
          </ListItem>

        </List>
      </Drawer>
    </>
  );
};

export default HeaderPersonalSpa;
