import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Icono de cerrar sesión

const HeaderAdmin = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    localStorage.removeItem('token');
    // Redirección a la página de inicio de sesión, si es necesario
    // history.push('/login');
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
          <ListItem button component={Link} to="/homeAdmin" onClick={handleDrawerClose}>
            <ListItemText primary="Inicio" />
          </ListItem>
          <ListItem button component={Link} to="/services" onClick={handleDrawerClose}>
            <ListItemText primary="Servicios" />
          </ListItem>
          <ListItem button component={Link} to="/categories" onClick={handleDrawerClose}>
            <ListItemText primary="Categorías" />
          </ListItem>
          <ListItem button component={Link} to="/spas" onClick={handleDrawerClose}>
            <ListItemText primary="Spas" />
          </ListItem>
          <ListItem button component={Link} to="/users" onClick={handleDrawerClose}>
            <ListItemText primary="Usuarios" />
          </ListItem>
          {/* Separador */}
          <Divider />
          {/* Opción de cerrar sesión */}
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Cerrar sesión" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default HeaderAdmin;
