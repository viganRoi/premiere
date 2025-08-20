import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGalleryModalApartmentId, getGalleryModalState, setGalleryModalData } from '../../../features/apartment/ApartmentEditSlice';
import axios from 'axios';
import { BASE_URL } from '../../../utils/consts';
import { toast } from 'react-toastify';

const AdmApartmentGallery = () => {
    const dispatch = useDispatch();

    const open = useSelector(getGalleryModalState);
    const apartmentId = useSelector(getGalleryModalApartmentId);
    const [link, setLink] = React.useState([]);
    const [fields, setFields] = React.useState(0);

    useEffect(() => {
        console.log(apartmentId)
    }, [apartmentId])

    function handleClose() {
        dispatch(setGalleryModalData({ open: false, apartmentId: null }));
    }

    function setLinks(link) {
        setLink(link);
    }

    function handleFields(type) {
        if(type === 'dec') {
            if(fields > 0) {
                setFields(fields - 1);
            }
        }
        if(type === 'inc') {
            setFields(fields + 1);
        }
    }

    function handleSave() {
        const form = new FormData();
        form.append('apartmentId', apartmentId);
        form.append('url', link);
        axios.post(`${BASE_URL}/api/v1/gallery/create`, form).then(res => {
            console.log(res.data);
            toast.success('Gallery created successfully');
        }).catch(err => {
            if(err.response?.data === 'Gallery already exists') {
                toast.error('Gallery already exists');
                return;
            }
            console.log(err);
            toast.error('Gallery creation failed');
        })
    }
 
    return (
      <Modal onClose={handleClose} open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "1px solid #000",
            boxShadow: 24,
            borderRadius: '10px',
            p: 4,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h1>Gallery</h1>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Link"
                value={link}
                onChange={(e) => setLinks(e.target.value)}
                fullWidth
                size='small'
              />
              </Grid>
              {Array.from(Array(fields), (_, index) => (
                <Grid item xs={12} key={index}>
                  <TextField
                    size='small'
                    label={`Link ${index + 1}`}
                    value={link[index] || ""}
                    onChange={(e) => {
                      const updatedLinks = [...link];
                      updatedLinks[index] = e.target.value;
                      setLink(updatedLinks);
                    }}
                    fullWidth
                  />
                </Grid>
              ))}
            <Grid item xs={12} sx={{display: 'flex', gap: 1, justifyContent: 'space-between'}}>
              <Button variant='contained' onClick={() => handleFields('inc')}>+</Button>
              <Button variant='contained' onClick={() => handleFields('dec')}>-</Button>
            </Grid>
            <Grid item xs={12}>
            <Button sx={{mt: 1}} variant='contained' fullWidth onClick={() => handleSave()}>Save</Button>
              </Grid>
          </Grid>
        </Box>
      </Modal>
    );
}

export default AdmApartmentGallery