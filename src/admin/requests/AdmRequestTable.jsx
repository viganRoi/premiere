import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../auth/axiosInstance';
import { Approval, Delete, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { toast } from 'react-toastify';
import moment from 'moment';

const columns = ['Nr', 'Emri Apartmentit', 'Emri Objektit', 'Ndryshuar nga', 'Aprovuar nga', 'Status', 'Data Kërkesës', 'Veprimet'];
const api = `/api/requests`;

function getAllRequests() {
    return axiosInstance.get(`${api}/get/all`);
}

function approveRequest(id) {
    return axiosInstance.get(`${api}/approve?id=${id}`)
}

function rejectRequest(id) {
    return axiosInstance.get(`${api}/reject?id=${id}`)
}

const AdmRequestTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [sortByDate, setSortByDate] = useState('desc');

    const handleApproveRequest = (id) => {
        setLoading(true);
        approveRequest(id).then(res => {
            toast.success('Kërkesa u aprovua me sukses');
        }).catch(err => {
            if(err.response?.status === 400) {
                if(err.response?.data === 'No access') {
                    toast.error('Nuk keni akses për këtë veprim');
                    return;
                }
                if(err.response?.data === 'User not found') {
                    toast.error('Përdoruesi nuk u gjet');
                    return;
                }
            }
            setError(err);
            toast.error('Gabim në aprovim të kërkesës');
        });
        setLoading(false);
    }

    const handleRejectRequest = (id) => {
        setLoading(true);
        rejectRequest(id).then(res => {
            toast.success('Kërkesa u refuzua me sukses');
        }).catch(err => {
            if(err.response?.status === 400) {
                if(err.response?.data === 'No access') {
                    toast.error('Nuk keni akses për këtë veprim');
                    return;
                }
                if(err.response?.data === 'User not found') {
                    toast.error('Përdoruesi nuk u gjet');
                    return;
                }
            }
            setError(err);
            toast.error('Gabim në refuzim të kërkesës');
        });
        setLoading(false);
    }

    useEffect(() => {
        getAllRequests().then(res => {
            setData(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);
    return (
        <TableContainer>
            <Table sx={{ minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => {
                            if(column === 'Data Kërkesës') {
                                return <TableCell sx={{fontSize: '18px', p: '20px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} key={index}>
                                    {column}
                                    <IconButton onClick={() => setSortByDate(sortByDate === 'desc' ? 'asc' : 'desc')}>
                                        {sortByDate === 'desc' ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                                    </IconButton>
                                </TableCell>
                            }
                            else {
                                return <TableCell sx={{fontSize: '18px', p: '20px 15px' }} key={index}>{column}</TableCell>
                            }
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.sort((a, b) => {
                        const dateA = new Date(a.requestedAt);
                        const dateB = new Date(b.requestedAt);
                        
                        // For descending order (newest first), subtract dateB from dateA
                        return sortByDate === 'desc' ? dateB - dateA : dateA - dateB;
                        }).map((row, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ p: '3px 15px' }}>{index + 1}</TableCell>
                            <TableCell sx={{ p: '3px 15px' }}>{row.apartmentName}</TableCell>
                            <TableCell sx={{ p: '3px 15px' }}>{row.objectName}</TableCell>
                            <TableCell sx={{ p: '3px 15px' }}>{row.requestedBy}</TableCell>
                            <TableCell sx={{ p: '3px 15px' }}>{moment(row.approvedAt).format('DD-MM-yyyy HH:mm:ss')}</TableCell>
                            <TableCell sx={{ p: '3px 15px' }}>{row.status}</TableCell>
                            <TableCell sx={{ p: '3px 15px' }}>{moment(row.requestedAt).format('DD-MM-yyyy HH:mm:ss')}</TableCell>
                            <TableCell sx={{ p: '3px 15px' }}>
                                {row.status === 'PENDING' && (<React.Fragment>
                                    <Tooltip title={'Aprovo Kërkesën'}>
                                        <IconButton color='primary' onClick={() => handleApproveRequest(row.id)}>
                                            <Approval />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title='Refuzo Kërkesën'>
                                        <IconButton onClick={() => handleRejectRequest(row.id)} color='error'>
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                </React.Fragment>)
                                    }
                            </TableCell>
                        </TableRow>
                    ))}
                    {/* Add more rows as needed */}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdmRequestTable;