import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from '../../components/HeaderAdmin';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import ImageIcon from '@mui/icons-material/Image';


const UpdateServices = () => {
  const [serviceData, setServiceData] = useState({
    name_service: '',
    description: '',
    materials: '',
    thumbnail: '',
    status: '',
    published: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/services/${id}`);
        setServiceData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del servicio:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/services/${id}/`, serviceData);
      console.log('Servicio actualizado:', response.data);
      navigate('/services');
    } catch (error) {
      console.error('Error al actualizar el servicio:', error);
    }
  };;

  return (
    <>
      <HeaderAdmin />

      <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4, padding: 3, border: '1px solid #ccc', borderRadius: '5px' }}>
        <Typography variant="h4" gutterBottom>
          Actualizar Servicio
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name_service"
            name="name_service"
            label="Nombre"
            value={serviceData.name_service}
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
            value={serviceData.description}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="materials"
            name="materials"
            label="Materiales"
            value={serviceData.materials}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="thumbnail"
            name="thumbnail"
            label="Thumbnail"
            value={serviceData.thumbnail}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {serviceData.thumbnail ? (
                    <Avatar alt="Thumbnail" src={serviceData.thumbnail} />
                  ) : (
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  )}
                </InputAdornment>
              ),
            }}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="published-label">Publicado</InputLabel>
            <Select
              labelId="published-label"
              id="status"
              name="status"
              value={serviceData.status}
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

export default UpdateServices;
