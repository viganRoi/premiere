import { Popover } from '@mui/material'
import React, { useEffect } from 'react'
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { CheckBox, CheckBoxOutlineBlank, Close, Edit, FlipCameraAndroid, SupportAgent } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getSession, handleLoginModalState, isAuthorized } from '../features/auth/AuthSlice';
import { toast } from 'react-toastify';
import { setApartmentEditData, setApartmentEditModalState } from '../features/apartment/ApartmentEditSlice';
import { updateIsSold } from '../features/apartment/ApartmentAPI';
import { setApartmentIdModalApartmentId, setApartmentIdModalId, setApartmentIdModalState } from '../features/apartment/ApartmentSlice';

const ContextMenu = ({ menu, setMenu }) => {
    const dispatch = useDispatch()
    const status = null
    const handleClose = () => {
        setMenu((prev) => ({
            ...prev,
            open: false,
        }))
    }
  React.useEffect(() => {
    if (status === "updateApartment_isSold_success") {
      handleClose()
      toast.success("Dokumenti u ruaj me sukses", {
        position: "top-right",
        onClose: () => {
          
        },
      });
      
    }
    if (status === 'updateApartment_isSold_rejected') {
      handleClose()
      toast.error(
        'Gabim ne ruajtjen e dokumentit', {
          position: 'top-right',
          onClose: () => {
            
          }
        }
      )
    }
  }, [status]);
  if(!isAuthorized()) return

  return (
    <Popover
      open={menu?.open}
      anchorEl={menu?.anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Paper sx={{ width: 250, maxWidth: '100%' }}>
      <MenuList>
        <MenuItem onClick={() => {
          const dataToUpdate = {
            isSold: !menu?.data.isSold,
            id: menu?.data.id
          }
          dispatch(updateIsSold(dataToUpdate))
        }}>
          <ListItemIcon>
            {menu?.data?.isSold ? <CheckBoxOutlineBlank fontSize='small' /> : <CheckBox fontSize="small" />}
          </ListItemIcon>
          <ListItemText>{menu?.data?.isSold ? 'Etiketo si jo e shitur' : 'Etiketo si e shitur'}</ListItemText>         
                  
        </MenuItem>
        <MenuItem 

        onClick={() => {
            dispatch(setApartmentEditModalState(true))
            dispatch(setApartmentEditData(menu?.data))
            setMenu((prev) => ({...prev, open: false, anchorEl: null}))
        }}
        // onClick={() => {
        //   const session = getSession()
        //   const length = session ? Object.keys(session).length : 0;
        //   if(length > 1 && session?.isAuth === true){
        //     dispatch(setApartmentEditModalState(true))
        //     dispatch(setApartmentEditModalData(data))
        //     setMenu((prev) => ({...prev, open: false, anchorEl: null}))
        //   }
        //   else{
        //     dispatch(handleLoginModalState(true) )
        //   }         
        // }}
        >
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edito</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(setApartmentIdModalId(menu?.data.id));
          dispatch(setApartmentIdModalApartmentId(menu?.data.apartmentId));
          dispatch(setApartmentIdModalState(true));
        }}>
          <ListItemIcon>
            <FlipCameraAndroid fontSize='small'/>
          </ListItemIcon>
          <ListItemText>Ndro ID</ListItemText>
        </MenuItem>
        <MenuItem 
        // onClick={() => { 
        //   const session = getSession()
        //   const length = session ? Object.keys(session).length : 0;
        //   if(length > 1 && session?.isAuth === true){
        //     dispatch(handleSalesModalState(true))
        //     dispatch(handleSalesModalData(data))
        //     setMenu((prev) => ({...prev, open: false, anchorEl: null}))
        //   }
        //   else{
        //     dispatch(handleLoginModalState(true) )
        //   }         
        // }}
        >
          <ListItemIcon>
            <SupportAgent fontSize="small" />
          </ListItemIcon>
          <ListItemText>Shitja</ListItemText>
        </MenuItem>       
        <Divider />
        <MenuItem onClick={() => { 
          
          setMenu((prev) => ({...prev, open: false, anchorEl: null}))}}>
          <ListItemIcon>
            <Close fontSize="small" />
          </ListItemIcon>
          <ListItemText>Mbyll</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
    </Popover>
  );
}

export default ContextMenu
