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

const FormCategories = () => {
  const [newCategorieData, setNewCategorieData] = useState({
    name: '',
    description: '',
    thumbnail: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategorieData({ ...newCategorieData, [name]: value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/categories/', {
        name: newCategorieData.name,
        description: newCategorieData.description,
        thumbnail: newCategorieData.thumbnail,

      });
      console.log('Nueva categoria creada:', response.data);
      navigate('/categories');
    } catch (error) {
      console.error('Error al crear la nueva categoria:', error.response.data);
    }
  };

  return (
    <>
          <HeaderAdmin />
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Crear Nueva Categoria
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Nombre"
          value={newCategorieData.name}
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
          value={newCategorieData.description}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="thumbnail"
          name="thumbnail"
          label="Thumbnail"
          value={newCategorieData.thumbnail}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {newCategorieData.thumbnail ? (
                  <Avatar alt="Thumbnail" src={newCategorieData.thumbnail} />
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
          Crear Categoria
        </Button>
      </form>
    </Box>
    </>
  );
};

export default FormCategories;
