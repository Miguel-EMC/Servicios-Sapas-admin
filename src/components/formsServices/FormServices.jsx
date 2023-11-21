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
import HeaderAdmin from '../../components/HeaderAdmin';

const FormServices = () => {
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
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/services/', {
        name_service: newServiceData.name,
        description: newServiceData.description,
        materials: newServiceData.materials,
        thumbnail: newServiceData.thumbnail,

      });
      console.log('Nuevo servicio creado:', response.data);
      navigate('/services');
    } catch (error) {
      console.error('Error al crear el nuevo servicio:', error.response.data);
    }
  };

  return (
    <>
          <HeaderAdmin />
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

export default FormServices;
