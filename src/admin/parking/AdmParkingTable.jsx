import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import { DeleteForever, Edit, FlipCameraAndroid, Paid } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setApartmentEditModalState } from '../../../features/apartment/ApartmentEditSlice';
import { getAllBuildingAndApartmentsData, setApartmentIdModalId, setApartmentIdModalState } from '../../../features/apartment/ApartmentSlice';
import { getApartmentsSvgDataAll } from '../../../features/apartment/ApartmentAPI';

const AdmParkingTable = () => {
    const dispatch = useDispatch();
    const data = useSelector(getAllBuildingAndApartmentsData)
    useEffect(() => {
        dispatch(getApartmentsSvgDataAll());
    }, [dispatch]);
    return (
        <TableContainer style={{ overflow: 'auto', marginTop: '5px' }}>
            <Table stickyHeader>
                <TableHead>sd
                    <TableRow>
                        <TableCell sx={{ bgcolor: 'black', color: 'white', pl: '5px', py: '10px'}}>Nr</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white', pl: '5px', py: '10px'}}>Statusi Shitjes</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white', pl: '5px', py: '10px'}}>Veprimet</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((building) => 
                        building.apartments.map((apartment, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{apartment.apartmentId}</TableCell>
                                <TableCell>{apartment.area}</TableCell>
                                <TableCell>{apartment.floor}</TableCell>
                                <TableCell>{apartment.type}</TableCell>
                                <TableCell>{apartment.balcony}</TableCell>
                                <TableCell>{apartment.isSold ? 'Shitur' : 'Jo Shitur'}</TableCell>
                                <TableCell>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => {
                                            dispatch(setApartmentIdModalId(apartment.apartmentId));
                                            dispatch(setApartmentIdModalState(true));
                                        }}>
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton>
                                            <DeleteForever />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Mark as Sold">
                                        <IconButton>
                                            <Paid />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Change the id of apartment.(Used when two or more apartments are the same)">
                                        <IconButton>
                                            <FlipCameraAndroid />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))
                    ) }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AdmParkingTable;
  