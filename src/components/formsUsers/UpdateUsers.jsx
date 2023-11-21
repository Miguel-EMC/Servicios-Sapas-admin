import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from '../HeaderAdmin';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import ImageIcon from '@mui/icons-material/Image';


const UpdateUsers = () => {
  const [spaData, setSpaData] = useState({
    name: '',
    description: '',
    thumbnail: '',
    status: '',
    address: '',
    published: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/spas/${id}`);
        setSpaData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos de la categoria:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSpaData({ ...spaData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/spas/${id}/`, spaData);
      console.log('SPA actualizado:', response.data);
      navigate('/spas');
    } catch (error) {
      console.error('Error al actualizar SPA:', error);
    }
  };;

  return (
    <>
      <HeaderAdmin />

      <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4, padding: 3, border: '1px solid #ccc', borderRadius: '5px' }}>
        <Typography variant="h4" gutterBottom>
          Actualizar  SpA
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Nombre"
            value={spaData.name}
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
            value={spaData.description}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="thumbnail"
            name="thumbnail"
            label="Thumbnail"
            value={spaData.thumbnail}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {spaData.thumbnail ? (
                    <Avatar alt="Thumbnail" src={spaData.thumbnail} />
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
            value={spaData.address}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="published-label">Publicado</InputLabel>
            <Select
              labelId="published-label"
              id="status"
              name="status"
              value={spaData.status}
              onChange={handleInputChange}
              label="Publicado"
            >
              <MenuItem value="published">Publicado</MenuItem>
              <MenuItem value="draft">Cancelado</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Actualizar
          </Button>
        </form>
      </Box>
    </>
  );
};

export default UpdateUsers 
