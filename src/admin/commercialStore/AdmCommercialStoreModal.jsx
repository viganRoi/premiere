import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { AddLocation, Image, Photo, PictureAsPdf, ThreeDRotation } from "@mui/icons-material";
import {
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
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { imagePath, mainUrl, pdfPath, planmetricImageUrl } from "../../../utils/consts";
import { getCommercialStoreEditModalData, getCommercialStoreEditModalState, getCommercialStoreStatus, resetCommercialStoreMsgAndStatus, setCommercialStoreEditModalState } from "../../../features/commercialStore/CommercialStoreSlice";
import { updateCommercialStore } from "../../../features/commercialStore/CommercialStoreApi";

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

function AdmCommercialStoreModal() {
  
  const modalState = useSelector(getCommercialStoreEditModalState);
  const apartmentEditData = useSelector(getCommercialStoreEditModalData);
  const dispatch = useDispatch();
  const status = useSelector(getCommercialStoreStatus);
  const [apartmentData, setApartmentData] = React.useState({
    id: "",
    rooms: 1,
    isAvailable: false,
    isRent: false,
    floorNumber: 0,
    square: 0,
    name: "",
    apartmentNumber: 1,
    style: "",
    className: "",
    path: "",
    apartmentId: "",
    balconySquare: 0,
    imgUrl: '',
    pdfUrl: '',
    threeDImageUrl: '',
    twoDImageUrl: '',
    vtourUrl: '',
    orientationImageUrl: '',
    description: '',
    object: '',
    storeNumber: '',
    storeId: '',
    storeHeight: 0,
  });

  function resetApartmentData() {
    setApartmentData({
      id: "",
    rooms: 1,
    isAvailable: false,
    isRent: false,
    floorNumber: 0,
    square: 0,
    name: "",
    apartmentNumber: 1,
    style: "",
    className: "",
    path: "",
    apartmentId: "",
    balconySquare: 0,
    imgUrl: '',
    pdfUrl: '',
    threeDImageUrl: '',
    twoDImageUrl: '',
    vtourUrl: '',
    orientationImageUrl: '',
    description: '',
    object: '',
    storeNumber: '',
    storeId: '',
    storeHeight: 0,
    });
  }

  React.useEffect(() => {
    if (apartmentEditData !== null) {
      if(!apartmentEditData.storeHeight) {
        setApartmentData({...apartmentEditData, storeHeight: 0});
      }
      else {

        setApartmentData(apartmentEditData);
      }
      
      // let pdfurl = '';
      // let imgurl = '';
      // const name = apartmentEditData.planMetric?.name?.split(',');
      // const url = apartmentEditData.planMetric?.url?.split(',');
      // for (let index = 0; index < name?.length; index++) {
      //   if (name[index].includes('card')) {
      //     imgurl = url[index].substring(imagePath.length);
      //   }
      //   if (name[index].includes('pdf')) {
      //     pdfurl = url[index].substring(pdfPath.length);
      //   }
      // }
      // setApartmentData((prev) => ({
      //   ...prev,
      //   imgUrl: imgurl,
      //   pdfUrl: pdfurl,
      //   twoDImageUrl: apartmentEditData.twoDImageUrl,
      // }));
    }
    else {
      resetApartmentData()
    }
  }, [apartmentEditData]);


  React.useEffect(() => {
    if (status === 'update_fulfilled') {
      toast.success(
        'Dokumenti u ruaj me sukses',
        {
          position: 'top-right',
          onClose: () => {
            //dispatch(getAllApartmentsById(buildId))
          }
        }
      );
      dispatch(setCommercialStoreEditModalState(false));
      dispatch(resetCommercialStoreMsgAndStatus());
    }
    if (status === 'update_rejected') {
      toast.error(
        'Gabim ne ruajtjen e dokumentit',
        {
          position: 'top-right',
        }
      );
      dispatch(resetCommercialStoreMsgAndStatus());
    }
  }, [status]);

  const [selectedImagePreview, setSelectedImagePreview] = React.useState(apartmentData.twoDImageUrl);

  const handleSubmit = (event) => {
    event.preventDefault();
    let imageName = [];
    let imagePathh = [];
    imageName.push('card', 'pdf');
    imagePathh.push(`${imagePath}${apartmentData.imgUrl}`, `${pdfPath}${apartmentData.pdfUrl}`);
    const formData = new FormData();
    formData.append("rooms", apartmentData.rooms);
    formData.append("isSold", apartmentData.isAvailable);
    formData.append("isRent", apartmentData.isRent);
    formData.append("floorNumber", apartmentData.floorNumber);
    formData.append("square", apartmentData.square);
    formData.append("name", apartmentData.name);
    formData.append("storeNumber", apartmentData.storeNumber);
    formData.append("style", apartmentData.style);
    formData.append("className", apartmentData.className);
    formData.append("twoDImageUrl", apartmentData.twoDImageUrl);
    formData.append("pdfUrl", apartmentData.pdfUrl);
    formData.append("path", apartmentData.path);
    formData.append("storeId", apartmentData.storeId);
    formData.append("storeHeight", apartmentData.storeHeight);
    formData.append("balconySquare", apartmentData.balconySquare);
    formData.append("id", apartmentData.id);
    formData.append("planMetricName", imageName);
    formData.append("planMetricUrl", imagePathh);
    formData.append("threeDImageUrl", apartmentData.threeDImageUrl);
    formData.append("orientationImageUrl", apartmentData.orientationImageUrl);
    formData.append("vTourUrl", apartmentData.vtourUrl);
    formData.append("description", apartmentData.description);
    dispatch(updateCommercialStore({ id: apartmentData.id, formData }));
  };

  return (
    <Modal
      open={modalState}
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
                    setSelectedImagePreview(apartmentData.twoDImageUrl)
                  }
                >
                  <Image />
                </IconButton>
                <IconButton
                  onClick={() =>
                    setSelectedImagePreview(apartmentData.threeDImageUrl)
                  }
                >
                  <ThreeDRotation />
                </IconButton>
                <IconButton
                  onClick={() =>
                    setSelectedImagePreview(
                      apartmentData.orientationImageUrl
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
                value={apartmentData.twoDImageUrl}
                onChange={(e) => {
                  setApartmentData({
                    ...apartmentData,
                    twoDImageUrl: e.currentTarget.value,
                  });
                }}
                label="Emri i fotos (A1-1.jpg)"
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
          </Box>
          <Divider
            variant="fullWidth"
            orientation="vertical"
            flexItem
            sx={{ marginX: 2 }}
          />
          <Box flex={5}>
            <Grid container spacing={2}>
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
                  label="Emri Lokalit"
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  name="apartmentNumber"
                  disabled
                  value={apartmentData.object}
                  label="Objekti"
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  size={"small"}
                  name="storeNumber"
                  label="Numri e Lokalit"
                  value={apartmentData.storeNumber}
                  onChange={(e) => {
                    setApartmentData((prev) => ({
                      ...prev,
                      storeNumber: e.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  size={"small"}
                  name="storeHeight"
                  label="Lartesia e Lokalit"
                  value={apartmentData.storeHeight}
                  onChange={(e) => {
                    setApartmentData((prev) => ({
                      ...prev,
                      storeHeight: e.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  size={"small"}
                  name="apartmentId"
                  label="ID e Lokalit"
                  disabled
                  value={apartmentData.storeId}
                />
              </Grid>
              <Grid item sm={12} md={12}>
                <Box maxHeight={120} overflow={"auto"}>
                  <TextField
                    multiline
                    label="PDF Url"
                    fullWidth
                    sx={{mt: 1}}
                    size={"small"}
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
                          <Tooltip title="Check if Pdf Link exists">
                            <IconButton
                              onClick={() =>
                                window.open(
                                  `${pdfPath}${apartmentData.pdfUrl}`,
                                  "_blank"
                                )
                              }
                            >
                              <PictureAsPdf />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item sm={12} md={6}>
                <FormControl>
                  <FormLabel>E Shitur</FormLabel>
                  <RadioGroup
                    value={apartmentData.isAvailable}
                    row={true}
                    onChange={(e) => {
                      setApartmentData((prev) => ({
                        ...prev,
                        isAvailable: e.target.value === "true",
                      }));
                    }}
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
              <Grid item sm={12} md={6}>
                <FormControl>
                  <FormLabel>Rent</FormLabel>
                  <RadioGroup
                    value={apartmentData.isRent || false}
                    row={true}
                    onChange={(e) => {
                      setApartmentData((prev) => ({
                        ...prev,
                        isRent: e.target.value === "true",
                      }));
                    }}
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
            </Grid>
          </Box>
        </Box>
        <Box display={"flex"} gap={2} justifyContent="flex-end" mt={2}>
          <Button variant="contained" onClick={handleSubmit}>
            Ruaj
          </Button>
          <Button
            onClick={() => {
              dispatch(setCommercialStoreEditModalState(false));
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

export default AdmCommercialStoreModal;
