import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { DeleteForever, Edit, Paid } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setApartmentEditModalState } from '../../../features/apartment/ApartmentEditSlice';
import { getCommercialStoresData, setCommercialStoreEditModalData, setCommercialStoreEditModalState } from '../../../features/commercialStore/CommercialStoreSlice';
import { fetchAllCommercialStoreAndBuilding } from '../../../features/commercialStore/CommercialStoreApi';

const AdmCommercialStoreTable = () => {
    const dispatch = useDispatch();
    const data = useSelector(getCommercialStoresData);

    useEffect(() => {
        dispatch(fetchAllCommercialStoreAndBuilding());
    }, [dispatch]);
    
    return (
        <TableContainer style={{ overflow: 'auto', marginTop: '15px', flexGrow: 1 }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ bgcolor: 'black', color: 'white'}}>Nr</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white'}}>Titulli</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white'}}>ID Lokalit</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white'}}>Sipërfaqja</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white'}}>Kati</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white'}}>Rent?</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white'}}>Shitur?</TableCell>
                        <TableCell sx={{ bgcolor: 'black', color: 'white'}}>Veprimet</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((list, index) => 
                        list.commercialStoreList?.map((store, index) => (
                            (
                                <TableRow key={store.id}>
                                    <TableCell sx={{ p: '5px 5px'}}>{index + 1}</TableCell>
                                    <TableCell sx={{ p: '5px 5px'}}>{store.name}</TableCell>
                                    <TableCell sx={{ p: '5px 5px'}}>{store.storeId}</TableCell>
                                    <TableCell sx={{ p: '5px 5px'}}>{store.square}</TableCell>
                                    <TableCell sx={{ p: '5px 5px'}}>{store.floorNumber}</TableCell>
                                    <TableCell sx={{ p: '5px 5px'}}>{store.isRent ? 'PO' : 'JO'}</TableCell>
                                    <TableCell sx={{ p: '5px 5px'}}>{store.isAvailable ? 'JO' : 'PO'}</TableCell>
                                    <TableCell sx={{ p: '5px 5px'}}>
                                        <IconButton onClick={() => 
                                            {
                                                dispatch(setCommercialStoreEditModalState(true));
                                                dispatch(setCommercialStoreEditModalData({
                                                    object: list.buildingNr,
                                                    ...store
                                                }));
                                            }
                                            }>
                                            <Edit />
                                        </IconButton>
                                        <IconButton>
                                            <DeleteForever />
                                        </IconButton>
                                        <IconButton>
                                            <Paid />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AdmCommercialStoreTable;
  