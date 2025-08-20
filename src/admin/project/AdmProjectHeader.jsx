import { Add } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setProjectModalState } from '../../../features/project/ProjectSlice'

const AdmProjectHeader = () => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <h1 style={{
        fontSize: '20px',
        fontWeight: '500'
      }}>Projektet</h1>
      <Button
        onClick={() => dispatch(setProjectModalState(true))}
        sx={{
          bgcolor: "black",
          ":hover": { bgcolor: "rgba(35, 35, 35, 0.95)" },
        }}
        startIcon={<Add />}
        variant="contained"
      >
        Projekt i ri
      </Button>
    </Box>
  );
}

export default AdmProjectHeader;