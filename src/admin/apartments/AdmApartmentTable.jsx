import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import { BrowseGallery, DeleteForever, Edit, FlipCameraAndroid, Image, Paid } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setApartmentEditData, setApartmentEditModalState, setGalleryModalData } from '../../../features/apartment/ApartmentEditSlice';
import { getAllBuildingAndApartmentsData, setApartmentIdModalApartmentId, setApartmentIdModalId, setApartmentIdModalState } from '../../../features/apartment/ApartmentSlice';
import { getApartmentsSvgDataAll } from '../../../features/apartment/ApartmentAPI';
import AdmApartmentGallery from './AdmApartmentGallery';

const AdmApartmentTable = () => {
    const dispatch = useDispatch();

    const data = useSelector(getAllBuildingAndApartmentsData);
    const [galleryModal, setGalleryModal] = React.useState({
        open: false,
        apartmentId: null
    });

    useEffect(() => {
        dispatch(getApartmentsSvgDataAll());
    }, [dispatch]);

    return (
        <TableContainer style={{ overflow: 'auto', marginTop: '5px' }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ bgcolor: 'black', color: 'white', pl: '5px', py: '10px'}}>Nr</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white', pl: '5px', py: '10px'}}>Apartamenti</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white', pl: '5px', py: '10px'}}>Siperfaqja</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white', pl: '5px', py: '10px'}}>Kati</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white', pl: '5px', py: '10px'}}>Tipi</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white', pl: '5px', py: '10px'}}>Llamella</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white', pl: '5px', py: '10px'}}>Ana (Kendi) Llamelles</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white', pl: '5px', py: '10px'}}>Statusi Shitjes</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white', pl: '5px', py: '10px'}}>Veprimet</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((building) => 
                        building.apartmentList.filter((v,i,a)=>a.map(val=>val.apartmentId).indexOf(v.apartmentId)===i).map((apartment, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{pl: '5px', py: '1px'}}>{index + 1}</TableCell>
                                <TableCell sx={{pl: '5px', py: '1px'}}>{apartment.apartmentId}</TableCell>
                                <TableCell sx={{pl: '5px', py: '1px'}}>{parseFloat(apartment.square).toFixed(2)} m2</TableCell>
                                <TableCell sx={{pl: '5px', py: '1px'}}>{apartment.floorNumber}</TableCell>
                                <TableCell sx={{pl: '5px', py: '1px'}}>{apartment.rooms}</TableCell>
                                <TableCell sx={{pl: '5px', py: '1px'}}>{building.buildingNr}</TableCell>
                                <TableCell sx={{pl: '5px', py: '1px'}}>{building.buildingSide}</TableCell>
                                <TableCell sx={{pl: '5px', py: '1px'}}>{apartment.isSold ? 'Shitur' : 'Jo E Shitur'}</TableCell>
                                <TableCell sx={{pl: '5px', py: '1px'}}>
                                    <Tooltip title="Edit">
                                        <IconButton color='warning' onClick={() => {
                                            dispatch(setApartmentEditModalState(true));
                                            dispatch(setApartmentEditData(apartment));
                                        }}>
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton color='error'>
                                            <DeleteForever />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Mark as Sold">
                                        <IconButton color='info'>
                                            <Paid />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Change the id of apartment.(Used when two or more apartments are the same)">
                                        <IconButton color='secondary' onClick={() => {
                                            dispatch(setApartmentIdModalId(apartment.id));
                                            dispatch(setApartmentIdModalApartmentId(apartment.apartmentId));
                                            dispatch(setApartmentIdModalState(true));
                                        }}>
                                            <FlipCameraAndroid />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Add Gallery">
                                        <IconButton onClick={() => {
                                            dispatch(setGalleryModalData({ open: true, apartmentId: apartment.id }));
                                        }} color='primary'>
                                            <Image />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))
                    ) }
                </TableBody>
            </Table>
            <AdmApartmentGallery />
        </TableContainer>
    );
}

export default AdmApartmentTable;
  