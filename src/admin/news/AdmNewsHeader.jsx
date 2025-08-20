import { Add } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setNewsModalStatus } from '../../../features/news/NewsSlice';

const AdmNewsHeader = () => {
  const dispatch = useDispatch();
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',

    }}>
      <h1>Lajmet</h1>
      <Button onClick={() => dispatch(setNewsModalStatus(true))} sx={{bgcolor: 'black', ':hover': {bgcolor: 'rgba(35, 35, 35, 0.9)'}}} startIcon={<Add />} variant='contained'>Lajm i ri</Button>
    </Box>
  )
}
export default AdmNewsHeader;