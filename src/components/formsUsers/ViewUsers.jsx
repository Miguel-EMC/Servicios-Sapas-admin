import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

import { useNavigate } from 'react-router-dom';


import HeaderAdmin from '../HeaderAdmin';

const ViewUsers = () => {
    const [users, setCViewUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();  // Navegar entre rutas
    const [openDialog, setOpenDialog] = useState(false);
    const [spaToDelete, setServiceToDelete] = useState(null);

    const tokenUser = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `${tokenUser}` }
    };

    const getCViewUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user/', config);
            setCViewUsers(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data.message, 'error');
        }
    };

    useEffect(() => {
        getCViewUsers();
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/user/${id}/`);
            console.log(`Categoria con ID ${id} eliminado correctamente`, response.data);
            getCViewUsers();
        } catch (error) {
            console.error('Error al intentar eliminar el servicio:', error);
        }
    };

    const columns = [
        { id: 'thumbnail', label: 'Imagen', minWidth: 180 },
        { id: 'name', label: 'Nombre Spas', minWidth: 150 },
        { id: 'description', label: 'Descripción', minWidth: 170 },
        { id: 'address', label: 'Dirección', minWidth: 170 },
        { id: 'status', label: 'Estado', minWidth: 120 },
        { id: 'actions', label: 'Aciones', minWidth: 50 }
    ];

    return (
        <>
            <HeaderAdmin />
            <div style={{ marginLeft: '3%', marginRight: '3%', marginTop: '3%', paddingLeft: '3%', paddingRight: '3%', paddingBottom: '3%', paddingTop: '3%', borderRadius: '10px', backgroundColor: '#D9D9D9' }}>
                <h1 id='labelhelp'>CRUD SPA</h1>
                <Button variant="contained" endIcon={<AddIcon style={{ backgroundColor: 'black', borderRadius: '10px' }} />} sx={{ mt: '1%' }} onClick={() => navigate(`/createSpas`)}>
                    Añadir SPA
                </Button>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align="left" style={{ minWidth: column.minWidth }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((spa) => (
                                        <TableRow key={spa.id}>
                                            <TableCell>
                                                <img
                                                    src={spa.thumbnail}
                                                    alt={spa.name_spa}
                                                    className="spa-thumbnail"
                                                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                                                />
                                            </TableCell>
                                            <TableCell>{spa.name}</TableCell>
                                            <TableCell>{spa.description}</TableCell>
                                            <TableCell>{spa.address}</TableCell>
                                            <TableCell>{spa.status}</TableCell>
                                            <TableCell align="right">
                                                <ButtonGroup sx={{ gap: 0.5 }} orientation="vertical">
                                                    <Button
                                                        variant="text"
                                                        startIcon={<DeleteIcon style={{ color: 'white' }} />}
                                                        style={{ color: 'white', backgroundColor: 'red' }}
                                                        onClick={() => {
                                                            setServiceToDelete(spa.id);
                                                            setOpenDialog(true);
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                    <Dialog
                                                        open={openDialog}
                                                        onClose={() => setOpenDialog(false)}
                                                        aria-labelledby="alert-dialog-title"
                                                        aria-describedby="alert-dialog-description"
                                                    >
                                                        <DialogTitle id="alert-dialog-title">Confirmar eliminación</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText id="alert-dialog-description">
                                                                ¿Estás seguro de que deseas eliminar esta categoria?
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={() => setOpenDialog(false)} color="primary">
                                                                Cancelar
                                                            </Button>
                                                            <Button
                                                                onClick={() => {
                                                                    handleDelete(spaToDelete);
                                                                    setOpenDialog(false);
                                                                }}
                                                                color="primary"
                                                                autoFocus
                                                            >
                                                                Eliminar
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>

                                                    <Button
                                                        variant="text"
                                                        startIcon={<EditIcon style={{ color: 'white' }} />}
                                                        style={{ color: 'white', backgroundColor: 'green' }}
                                                        onClick={() => navigate(`/users/edit/${spa.id}`)}
                                                    >
                                                        Edit
                                                    </Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div >
        </>
    );
};

export default ViewUsers;
