import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Photo } from "@mui/icons-material";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BASE_URL, imagePath, mainUrl, pdfPath, planmetricImageUrl } from "../../../utils/consts";
import { getApartmentEditData, getApartmentEditModalState, getApartmentEditStatus, resetStatusAndMsg, setApartmentEditModalState } from "../../../features/apartment/ApartmentEditSlice";
import { updateApartment } from "../../../features/apartment/ApartmentAPI";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -45%)",
  width: 900,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 40,
  p: 2,
};

function AdmParkingModal() {
  
  const apartmentEditState = useSelector(getApartmentEditModalState);
  const apartmentEditData = useSelector(getApartmentEditData);
  const dispatch = useDispatch();
  const status = useSelector(getApartmentEditStatus)
  const [apartmentData, setApartmentData] = React.useState({
    id: "",
    rooms: 1,
    isSold: false,
    isReserved: false,
    object: '',
    floorNumber: 0,
    square: 0,
    name: "",
    imageData: null,
    apartmentNumber: 1,
    style: "",
    className: "",
    path: "",
    apartmentId: "",
    balconySquare: 0,
    threeDImageUrl: '',
    twoDImageUrl: '',
    pdfUrl: '',
    vtourUrl: '',
    description: '',
    isWarehouse: false,
    parkingNumber: 0,
    orientationImageUrl: ''
  });
  React.useEffect(() => {
    if (apartmentEditData !== null) {
      setApartmentData(apartmentEditData);
      let pdfurl = '';
      let imgurl = '';
      const name = apartmentEditData.planMetric?.name?.split(',')
      const url = apartmentEditData.planMetric?.url?.split(',')
      for (let index = 0; index < name?.length; index++) {
        
        // if(index < name.length -1 ){
        //   namee += name[index] + ',' + url[index] + ';'
        // }
        // else{
        //   namee += name[index] + ',' + url[index]
        // }
        if(name[index].includes('card')){
          imgurl = url[index].substring(imagePath.length)
        }
        if(name[index].includes('pdf')){
          pdfurl = url[index].substring(pdfPath.length)
        }
      }
      setApartmentData((prev) => (
        {...prev,
        imgUrl: imgurl,
        pdfUrl: pdfurl,
        imageData: apartmentEditData.imageUrl,
        }
      ))           
    }
  }, [apartmentEditData]);

  React.useEffect(() => {
    if (status === 'updateApartment_success') {
      toast.success(
        'Dokumenti u ruaj me sukses', {
          position: 'top-right',
          onClose: () => {
            //dispatch(getAllApartmentsById(buildId))
          }
        }
      )
      dispatch(setApartmentEditModalState(false));
      dispatch(resetStatusAndMsg());
    }
    if (status === 'updateApartment_rejected') {
      toast.error(
        'Gabim ne ruajtjen e dokumentit', {
          position: 'top-right',
        }
      );
      dispatch(resetStatusAndMsg());
    }
  }, [status]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let imageName = []
    let imagePathh = []
    // const imagePaths = apartmentData.imgUrl?.split(';')
    // imagePaths?.forEach((item) => {
    //   const data = item.split(',')
    //   imageName.push(data[0])
    //   imagePath.push(data[1])
    // })
    imageName.push('card', 'pdf')
    imagePathh.push(`${imagePath}${apartmentData.imgUrl}`, `${pdfPath}${apartmentData.pdfUrl}`)
    const formData = new FormData();
    formData.append("vTourUrl", apartmentData.vtourUrl);
    formData.append("isSold", apartmentData.isSold);
    formData.append("floorNumber", apartmentData.floorNumber);
    formData.append("square", apartmentData.square);
    formData.append("name", apartmentData.name);
    formData.append("parkingPositionImageUrl", apartmentData.orientationImageUrl);
    formData.append("parkingNumber", apartmentData.parkingNumber);
    formData.append("pdfUrl", apartmentData.pdfUrl);
    formData.append("isWarehouse", apartmentData.isWarehouse);
    formData.append("isReserved", apartmentData.isReserved);
    formData.append("className", apartmentData.className);
    formData.append("imageUrl", apartmentData.twoDImageUrl);
    formData.append("image3dUrl", apartmentData.threeDImageUrl);
    formData.append("path", apartmentData.path);
    formData.append("apartmentId", apartmentData.apartmentId);
    formData.append("balconySquare", apartmentData.balconySquare);
    formData.append("id", apartmentData.id);
    formData.append("planMetricName", imageName);
    formData.append("planMetricUrl", imagePathh);
    axios.put(`${BASE_URL}/api/v1/parking`, formData).then(
      res => {
        toast.success('U ruajt')
      }
    )
  };
  

  return (
    <Modal
      open={apartmentEditState}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        ":focus-visible": {
          outline: "none",
        },
      }}
    >
      <Box sx={style}>
        <Box display={"flex"} gap={1} p={4}>
          <Box flex={2}>
            <Box>
              <img
                style={{
                  border: "1px solid gray",
                  borderRadius: 8,
                }}
                width={250}
                height={200}
                src={`${mainUrl}${planmetricImageUrl}${apartmentData.imageData}`}
              />
            </Box>
            <Box display={"flex"} justifyContent={"center"} flexDirection={'column'} mt={2} gap={1}>
              <TextField
                size="small"
                value={apartmentData.twoDImageUrl}
                onChange={(e) => {
                  setApartmentData({
                    ...apartmentData,
                    twoDImageUrl: e.currentTarget.value,
                  });
                }}
                label="URL e fotos"
                name="imgUrl"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <Photo />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                size="small"
                value={apartmentData.threeDImageUrl}
                onChange={(e) => {
                  setApartmentData({
                    ...apartmentData,
                    threeDImageUrl: e.currentTarget.value,
                  });
                }}
                label="URL e fotos 3D"
                name="imgUrl"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <Photo />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              /> 
              <TextField
                size="small"
                value={apartmentData.orientationImageUrl}
                onChange={(e) => {
                  setApartmentData({
                    ...apartmentData,
                    orientationImageUrl: e.currentTarget.value,
                  });
                }}
                label="URL e fotos orientimit"
                name="imgUrl"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <Photo />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              /> 
            </Box>
            {/* <Box maxHeight={120} height={100} overflow={"auto"}>
              <TextField
                size="small"
                multiline
                label='Photo URL (Ndaj me ",")'
                fullWidth
                sx={{ marginTop: 2 }}
                value={apartmentData.imgUrl}
                name="imgUrl"
                onChange={(e) => {
                  setApartmentData({
                    ...apartmentData,
                    imgUrl: e.target.value,
                  });
                }}
              />
            </Box> */}
          </Box>
          <Divider
            variant="fullWidth"
            orientation="vertical"
            flexItem
            sx={{ marginX: 2 }}
          />
          <Box flex={5}>
            <Grid container spacing={1} marginTop={1}>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  value={apartmentData.square}
                  onChange={(e) => {
                    setApartmentData((prev) => ({
                      ...prev,
                      square: e.target.value,
                    }));
                  }}
                  name="square"
                  label="Siperfaqja m2"
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  name="floorNumber"
                  value={apartmentData.floorNumber}
                  onChange={(e) => {
                    setApartmentData((prev) => ({
                      ...prev,
                      floorNumber: e.target.value,
                    }));
                  }}
                  label="Kati"
                />
              </Grid>
              
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  name="name"
                  value={apartmentData.name}
                  onChange={(e) => {
                    setApartmentData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }));
                  }}
                  label="Emri parkingut"
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  name="parkingNumber"
                  value={apartmentData.parkingNumber}
                  onChange={(e) => {
                    setApartmentData((prev) => ({
                      ...prev,
                      parkingNumber: e.target.value,
                    }));
                  }}
                  label="Numri parkingut"
                />
              </Grid>
              <Grid item sm={12} md={12}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Disponueshmeria
                  </FormLabel>
                  <RadioGroup
                    value={apartmentData.isSold}
                    row={true}
                    onChange={(e) => {
                      setApartmentData((prev) => ({
                        ...prev,
                        isSold: e.target.value,
                      }));
                    }}
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Shitur"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="Jo e shitur"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item sm={12} md={6}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Reservuar
                  </FormLabel>
                  <RadioGroup
                    value={apartmentData.isReserved}
                    row={true}
                    onChange={(e) => {
                      setApartmentData((prev) => ({
                        ...prev,
                        isReserved: e.target.value,
                      }));
                    }}
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="PO"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="JO"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                <FormLabel>Eshte Depo?</FormLabel>
                    <Checkbox checked={apartmentData.isWarehouse} onChange={(e) => setApartmentData({
                        ...apartmentData,
                        isWarehouse: e.target.checked,
                      })} />
              </Grid>
              <Grid item sm={12} md={12}>
                <Box maxHeight={120} height={100} overflow={"auto"}>
                  <TextField
                    multiline
                    label="PDF Emri"
                    fullWidth
                    size={"small"}
                    sx={{ marginTop: 2 }}
                    value={apartmentData.pdfUrl}
                    name="pdfUrl"
                    onChange={(e) => {
                      setApartmentData({
                        ...apartmentData,
                        pdfUrl: e.target.value,
                      });
                    }}
                  />
                </Box>
              </Grid>
              <Grid item sm={12} md={12}>
              <TextField
                    multilin
                    label="URL e Virtual Tour"
                    fullWidth
                    size={"small"}
                    value={apartmentData.vtourUrl}
                    name="vtourUrl"
                    onChange={(e) => {
                      setApartmentData({
                        ...apartmentData,
                        vtourUrl: e.target.value,
                      });
                    }}
                  />
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box display={"flex"} gap={2}>
          <Button variant="contained" onClick={handleSubmit}>
            Ruaj
          </Button>
          <Button
            onClick={() => {
              dispatch(setApartmentEditModalState(false));
            }}
            variant="contained"
          >
            Anulo
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AdmParkingModal