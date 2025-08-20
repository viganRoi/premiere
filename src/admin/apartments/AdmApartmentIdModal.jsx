import { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getApartmentIdModalApartmentId, getApartmentIdModalId, getApartmentIdModalState, setApartmentIdModalState } from '../../../features/apartment/ApartmentSlice';
import { Close } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../utils/consts';
import axiosInstance from '../../auth/axiosInstance';

const urlObjects = `${BASE_URL}/api/apartment`;

const AdmApartmentIdModal = () => {
    const open = useSelector(getApartmentIdModalState);
    const id = useSelector(getApartmentIdModalId);
    const apartmentId = useSelector(getApartmentIdModalApartmentId)
    const [status, setStatus] = useState('');
    const dispatch = useDispatch();
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');

    const handleClose = () => {
        dispatch(setApartmentIdModalState(false));
    };

    const handleInputChange2 = (e) => {
        setInput2(e.target.value);
    };

    function updateApartment( { id, newId } ) {
      return axiosInstance.put(`${urlObjects}/update/apartmentId?id=${id}&apartmentId=${newId}`);
    }

    const handleSubmit = async () => {
        console.log(id)
        // Handle form submission here
        if(id !== null) {
          setStatus('updateApartmentId_pending')
            updateApartment({id: id, newId: input2}).then(res => {
              setStatus('updateApartmentId_success')
            }).catch(err => {
              setStatus('updateApartmentId_rejected')
            })
        }
    };

    useEffect(() => {
        switch (status) {
            case 'updateApartmentId_pending':
                toast.info("Updating Apartment ID");
                break;
            case 'updateApartmentId_success':
                toast.success("Apartment ID updated successfully")
                handleClose();
                break;
            case 'updateApartmentId_rejected':
                toast.error("Apartment ID update failed");
                handleClose();
                break;
            default:
                break;
        }
    }
    , [status]);

    return (
      <Modal open={open} onClose={handleClose} keepMounted>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
            }}
          >
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: '5px'
            }}>
                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                px: 3,
                pb: 3
            
            }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Modal Header
              </Typography>
              <TextField
                
                value={apartmentId ? apartmentId : ''}
                disabled
                size='small'
                sx={{ mb: 2 }}
              />
              <TextField
                label="Change Apartment ID"
                value={input2}
                size='small'
                onChange={handleInputChange2}
                sx={{ mb: 2 }}
              />
              <Button onClick={handleSubmit} variant="contained">
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>
    );
};

export default AdmApartmentIdModal;