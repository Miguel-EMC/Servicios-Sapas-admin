import React, { useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import ImageIcon from '@mui/icons-material/Image';
import { useNavigate } from 'react-router-dom';
import HeaderPersonalSpa from '../HeaderPersonalSpa';

const FormSpaServices = () => {
  const [newServiceData, setNewServiceData] = useState({
    name_service: '',
    description: '',
    materials: '',
    thumbnail: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewServiceData({ ...newServiceData, [name]: value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    const userId = JSON.parse(localStorage.getItem('user')).id; // Obtener el ID del usuario del localStorage
  
    console.log(userId)
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/services/',
        {
          name_service: newServiceData.name,
          description: newServiceData.description,
          materials: newServiceData.materials,
          thumbnail: newServiceData.thumbnail,
          create_by: userId, // Pasar el user.id al crear el servicio
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log('Nuevo servicio creado:', response.data);
      navigate('/servicesSpa');
    } catch (error) {
      console.error('Error al crear el nuevo servicio:', error.response.data);
    }
  };
  
  

  return (
    <>
          <HeaderPersonalSpa />
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Crear Nuevo Servicio
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Nombre"
          value={newServiceData.name}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          multiline
          id="description"
          name="description"
          label="Descripción"
          value={newServiceData.description}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="materials"
          name="materials"
          label="Materiales"
          value={newServiceData.materials}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="thumbnail"
          name="thumbnail"
          label="Thumbnail"
          value={newServiceData.thumbnail}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {newServiceData.thumbnail ? (
                  <Avatar alt="Thumbnail" src={newServiceData.thumbnail} />
                ) : (
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                )}
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Crear Servicio
        </Button>
      </form>
    </Box>
    </>
  );
};

export default FormSpaServices;
