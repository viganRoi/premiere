import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { DeleteForever, Edit, Paid } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setApartmentEditModalState } from '../../../features/apartment/ApartmentEditSlice';

const AdmNewsTable = () => {
    const dispatch = useDispatch();
    
    return (
        <TableContainer style={{ overflow: 'auto', marginTop: '15px' }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ bgcolor: 'black', color: 'white'}}>Nr</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white'}}>Titulli</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white'}}>Pershkrimi</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white'}}>Krijuar me</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white'}}>Veprimet</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from({ length: 50 }, (_, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{p: 0, pl: '5px', py: '5px'}}>{index + 1}</TableCell>
                            <TableCell sx={{p: 0, pl: '5px', py: '5px'}}>Dummy Apartment {index + 1}</TableCell>
                            <TableCell sx={{p: 0, pl: '5px', py: '5px'}}>Dummy Area {index + 1}</TableCell>
                            <TableCell sx={{p: 0, pl: '5px', py: '5px'}}>Dummy Sale Status {index + 1}</TableCell>
                            <TableCell sx={{p: 0, pl: '5px', py: '5px'}}>
                                <IconButton color='primary' size='small'>
                                    <Paid />
                                </IconButton>
                                <IconButton onClick={() => {
                                    dispatch(setApartmentEditModalState(true));
                                }} color='warning' size='small'>
                                    <Edit />
                                </IconButton>
                                <IconButton color='error' size='small'>
                                    <DeleteForever />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
  
export default AdmNewsTable;
  