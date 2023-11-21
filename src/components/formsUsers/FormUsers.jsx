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
import HeaderAdmin from '../HeaderAdmin';

const FormUsers = () => {
  const [newSpaData, setNewSpaData] = useState({
    name: '',
    description: '',
    thumbnail: '',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSpaData({ ...newSpaData, [name]: value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/spas/', {
        name: newSpaData.name,
        description: newSpaData.description,
        thumbnail: newSpaData.thumbnail,

      });
      console.log('Nuevo spa creado:', response.data);
      navigate('/spas');
    } catch (error) {
      console.error('Error al crear spa:', error.response.data);
    }
  };

  return (
    <>
          <HeaderAdmin />
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Crear Nuevo Spa
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Nombre"
          value={newSpaData.name}
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
          value={newSpaData.description}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="thumbnail"
          name="thumbnail"
          label="Thumbnail"
          value={newSpaData.thumbnail}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {newSpaData.thumbnail ? (
                  <Avatar alt="Thumbnail" src={newSpaData.thumbnail} />
                ) : (
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                )}
              </InputAdornment>
            ),
          }}
        />
              <TextField
          fullWidth
          multiline
          id="address"
          name="address"
          label="Dirección"
          value={newSpaData.address}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Crear Spa
        </Button>
      </form>
    </Box>
    </>
  );
};

export default FormUsers;
