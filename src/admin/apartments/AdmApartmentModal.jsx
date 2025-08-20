import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { AddLocation, Image, Photo, PictureAsPdf, ThreeDRotation, ViewInAr } from "@mui/icons-material";
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { imagePath, mainUrl, pdfPath, planmetricImageUrl, vTourPath } from "../../utils/consts";
import { getApartmentEditData, getApartmentEditModalState, getApartmentEditStatus, resetStatusAndMsg, setApartmentEditModalState } from "../../features/apartment/ApartmentEditSlice";
import { updateApartment } from "../../features/apartment/ApartmentAPI";
import axiosInstance from "../../components/auth/axiosInstance";

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

function AdmApartmentModal() {
  
  const apartmentEditState = useSelector(getApartmentEditModalState);
  const apartmentEditData = useSelector(getApartmentEditData);
  const dispatch = useDispatch();
  const status = useSelector(getApartmentEditStatus);
  const [apartmentData, setApartmentData] = React.useState({
    id: "",
    rooms: 1,
    isSold: false,
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
    imgUrl: '',
    pdfUrl: '',
    image3dUrl: '',
    imageUrl: '',
    vtourUrl: '',
    apartmentPositionImageUrl: '',
  });
  const [selectedImagePreview, setSelectedImagePreview] = React.useState(apartmentData.imageUrl);

  function resetApartmentData() {
    setApartmentData({
      id: "",
      rooms: 1,
      isSold: false,
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
      imgUrl: '',
      pdfUrl: '',
      image3dUrl: '',
      imageUrl: '',
      vtourUrl: '',
      apartmentPositionImageUrl: '',
      });
  }

  React.useEffect(() => {
    if (apartmentEditData !== null) {
      setApartmentData(apartmentEditData);
      // let pdfurl = '';
      // let imgurl = '';
      // const name = apartmentEditData.planMetric?.name?.split(',')
      // const url = apartmentEditData.planMetric?.url?.split(',')
      // for (let index = 0; index < name?.length; index++) {
        
      //   // if(index < name.length -1 ){
      //   //   namee += name[index] + ',' + url[index] + ';'
      //   // }
      //   // else{
      //   //   namee += name[index] + ',' + url[index]
      //   // }
      //   if(name[index].includes('card')){
      //     imgurl = url[index].substring(imagePath.length)
      //   }
      //   if(name[index].includes('pdf')){
      //     pdfurl = url[index].substring(pdfPath.length)
      //   }
      // }
      // setApartmentData((prev) => (
      //   {...prev,
      //   imgUrl: imgurl,
      //   pdfUrl: pdfurl,
      //   imageData: apartmentEditData.imageUrl,
      //   }
      // ))           
    }
    else {
      resetApartmentData();
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
    formData.append("rooms", apartmentData.rooms);
    formData.append("isSold", apartmentData.isSold);
    formData.append("floorNumber", apartmentData.floorNumber);
    formData.append("square", apartmentData.square);
    formData.append("name", apartmentData.name);
    formData.append("apartmentNumber", apartmentData.apartmentNumber);
    formData.append("style", apartmentData.style);
    formData.append("className", apartmentData.className);
    formData.append("imageData", apartmentData.imageUrl);
    formData.append("pdfUrl", apartmentData.pdfUrl);
    formData.append("path", apartmentData.path);
    formData.append("apartmentId", apartmentData.apartmentId);
    formData.append("balconySquare", apartmentData.balconySquare);
    formData.append("id", apartmentData.id);
    formData.append("planMetricName", imageName);
    formData.append("planMetricUrl", imagePathh);
    formData.append("image3dUrl", apartmentData.image3dUrl)
    formData.append("apartmentPositionImageUrl", apartmentData.apartmentPositionImageUrl)
    formData.append("vTourUrl", apartmentData.vtourUrl);
    updateHandler(apartmentData.id, formData).then().catch();
  };

  function updateApartment( id, data ) {
    console.log(id)
    return axiosInstance.post(`/api/apartment/update?id=${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  }

  async function updateHandler( id, data) {
    try {
      // const res = await executeRequest(fetchUsersAll);
        toast.success("Dokumenti u ruajt me sukses!", {
          position: "top-right",
        });
      const res = await updateApartment(id, data);
    }
    catch (error) {
      toast.error("Gabim ne ruajtjen e dokumentit!", {
        position: "top-right",
      });
    }
  }
  

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
                src={`${mainUrl}${planmetricImageUrl}${selectedImagePreview}`}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <IconButton
                  onClick={() =>
                    setSelectedImagePreview(apartmentData.imageUrl)
                  }
                >
                  <Image />
                </IconButton>
                <IconButton
                  onClick={() =>
                    setSelectedImagePreview(apartmentData.image3dUrl)
                  }
                >
                  <ThreeDRotation />
                </IconButton>
                <IconButton
                  onClick={() =>
                    setSelectedImagePreview(
                      apartmentData.apartmentPositionImageUrl
                    )
                  }
                >
                  <AddLocation />
                </IconButton>
              </Box>
            </Box>
            <Box display={"flex"} justifyContent={"center"} mt={2}>
              <TextField
                size="small"
                value={apartmentData.imageUrl}
                onChange={(e) => {
                  setApartmentData({
                    ...apartmentData,
                    imageUrl: e.currentTarget.value,
                  });
                }}
                label="URL e fotos 2D"
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
            <Box
              maxHeight={130}
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              height={130}
              overflow={"auto"}
            >
              <TextField
                size="small"
                multiline
                label="URL e fotos 3D"
                fullWidth
                sx={{ marginTop: 2 }}
                value={apartmentData.image3dUrl}
                name="image3dUrl"
                onChange={(e) => {
                  setApartmentData({
                    ...apartmentData,
                    image3dUrl: e.target.value,
                  });
                }}
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
                multiline
                label="URL e fotos per orientim"
                fullWidth
                value={apartmentData.apartmentPositionImageUrl}
                name="apartmentPositionImageUrl"
                onChange={(e) => {
                  setApartmentData({
                    ...apartmentData,
                    apartmentPositionImageUrl: e.target.value,
                  });
                }}
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
                  name="rooms"
                  value={apartmentData.rooms}
                  onChange={(e) => {
                    setApartmentData((prev) => ({
                      ...prev,
                      rooms: e.target.value,
                    }));
                  }}
                  label="Numri i dhomave"
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
                  label="Emri baneses"
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  name="apartmentNumber"
                  value={apartmentData.apartmentNumber}
                  onChange={(e) => {
                    setApartmentData((prev) => ({
                      ...prev,
                      apartmentNumber: e.target.value,
                    }));
                  }}
                  label="Objekti"
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  name="balconySquare"
                  value={apartmentData.balconySquare}
                  onChange={(e) => {
                    setApartmentData((prev) => ({
                      ...prev,
                      balconySquare: e.target.value,
                    }));
                  }}
                  label="Terasa m2"
                />
              </Grid>
              <Grid item sm={12} md={12} lg={12} xl={12}>
                <TextField
                  fullWidth
                  size={"small"}
                  name="apartmentId"
                  label="ID e Apartamentit"
                  value={apartmentData.apartmentId}
                  onChange={(e) => {
                    setApartmentData((prev) => ({
                      ...prev,
                      apartmentId: e.target.value,
                    }));
                  }}
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
              <Grid item sm={12} md={12}>
                <TextField
                  multiline
                  label="Virtual Tour URL"
                  fullWidth
                  size={"small"}
                  sx={{ marginTop: 2 }}
                  value={apartmentData.vtourUrl ? apartmentData.vtourUrl : ''}
                  name="vtourUrl"
                  onChange={(e) => {
                    setApartmentData({
                      ...apartmentData,
                      vtourUrl: e.target.value,
                    });
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title='Check if Virtual Tour Link exists'>
                          <IconButton onClick={() => window.open(`${mainUrl}${vTourPath}/${apartmentData.vtourUrl}`, "_blank")}>
                            <ViewInAr />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={12} md={12}>
                <Box maxHeight={120} height={100} overflow={"auto"}>
                  <TextField
                    multiline
                    label="PDF Url"
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
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title='Check if Pdf Link exists'>
                            <IconButton onClick={() => window.open(`${pdfPath}${apartmentData.pdfUrl}`, '_blank')}>
                              <PictureAsPdf />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
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
              toast.warn('Ndryshimet u anuluan.', {
                position: 'top-right',
              });
              dispatch(setApartmentEditModalState(false));
              resetApartmentData();
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

export default AdmApartmentModal