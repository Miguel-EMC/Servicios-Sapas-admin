import axios from 'axios';
import { useEffect, useState } from 'react';
import { Grid,Typography, Paper } from '@mui/material';
import HeaderPersonalSpa from '../../components/HeaderPersonalSpa';

export const HomePersonalSpa = () => {
  const [services, setServices] = useState([]);
  const tokenUser = localStorage.getItem('token');

  const config = {
    headers: { Authorization: `${tokenUser}` }
  };

  const getServices = async () => {
    try {
      const servicesResponse = await axios.get(
        'http://127.0.0.1:8000/api/services',
        { headers: { 'accept': 'application/json', 'authorization': tokenUser } },
        config
      );
      setServices(servicesResponse.data);

      // Obtener datos de spas u otras secciones de manera similar
      // const spasResponse = await axios.get('...');
      // setSpas(spasResponse.data);

      // Puedes realizar llamadas a otras secciones aquí
    } catch (error) {
      // Manejo de errores
    }
  };

  useEffect(() => {
    getServices();
    // Realizar llamadas a otras secciones si es necesario
  });

  return (
    <div>
      <HeaderPersonalSpa />
      <div className="home-content" style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>Bienvenido al panel de administración de Personal Spa</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom>Número de Servicios</Typography>
              <Typography variant="h4" gutterBottom>{services.length}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default HomePersonalSpa;
