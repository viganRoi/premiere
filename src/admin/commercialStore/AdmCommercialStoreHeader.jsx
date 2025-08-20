import { Box } from '@mui/material'
import React from 'react'

const AdmCommercialStoreHeader = () => {

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <h1>Afarizmi</h1>
      {/* <Button
        onClick={() => dispatch(setProjectModalState(true))}
        sx={{
          bgcolor: "black",
          ":hover": { bgcolor: "rgba(35, 35, 35, 0.9)" },
        }}
        startIcon={<Add />}
        variant="contained"
      >
        I ri
      </Button> */}
    </Box>
  );
}

export default AdmCommercialStoreHeader;