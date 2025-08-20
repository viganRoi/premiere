import { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getApartmentIdModalId, getApartmentIdModalState, setApartmentIdModalState } from '../../../features/apartment/ApartmentSlice';
import { Close } from '@mui/icons-material';
import { updateApartmentId } from '../../../features/apartment/ApartmentAPI';
import { getApartmentEditStatus } from '../../../features/apartment/ApartmentEditSlice';
import { toast } from 'react-toastify';

const AdmParkingIdModal = () => {
    const open = useSelector(getApartmentIdModalState);
    const id = useSelector(getApartmentIdModalId);
    const status = useSelector(getApartmentEditStatus);
    const dispatch = useDispatch();
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');

    const handleClose = () => {
        dispatch(setApartmentIdModalState(false));
    };

    const handleInputChange2 = (e) => {
        setInput2(e.target.value);
    };

    const handleSubmit = () => {
        console.log(id)
        // Handle form submission here
        if(id !== null) {
            dispatch(updateApartmentId({id: id, newId: input2}))
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
      <div>
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
                label="Current Apartment ID"
                value={input1}
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
      </div>
    );
};

export default AdmParkingIdModal;