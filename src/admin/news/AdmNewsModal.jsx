import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Photo } from "@mui/icons-material";
import {
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { mainUrl, planmetricImageUrl } from "../../../utils/consts";
import { updateApartment } from "../../../features/apartment/ApartmentAPI";
import { getNewsModalData, getNewsModalState, getNewsModalStatus, setNewsModalStatus } from "../../../features/news/NewsSlice";
import { createNews, updateNews } from "../../../features/news/NewsApi";

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

function AdmNewsModal() {
  
  const modalState = useSelector(getNewsModalState);
  const newsEditData = useSelector(getNewsModalData);
  const dispatch = useDispatch();
  const status = useSelector(getNewsModalStatus)
  const [newsData, setNewsData] = React.useState({
    id: null,
    content: '',
    title: "",
    imageData: null,
  });
  React.useEffect(() => {
    if (newsEditData !== null) {
      setNewsData(newsEditData); 
    }
  }, [newsEditData]);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.size > 5242880) {
      toast.error("Foto eshte shume e madhe");
      return;
    }
    if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
      toast.error("Formati i fotos nuk eshte i pranueshem");
      return;
    }
    setNewsData((prev) => ({
      ...prev,
      imageData: event.target.files[0],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("rooms", newsData.rooms);
    formData.append("isSold", newsData.isSold);

    if(newsData.id) {
      formData.append("id", newsData.id);
      dispatch(updateNews(formData));
    }
    else {
      dispatch(createNews(formData));
    }
  };
  

  return (
    <Modal
      keepMounted 
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
                src={newsData.imageData ? URL.createObjectURL(newsData.imageData) : ''}
              />
            </Box>
            <Box display={"flex"} justifyContent={"center"} mt={2}>
              <input onChange={handleFileChange} accept="image/*" multiple={false} 
                id="contained-button-file" style={{display: 'none'}} type="file" />
              <label htmlFor="contained-button-file">ss</label>
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
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  size="small"
                  value={newsData.title}
                  onChange={(e) => {
                    setNewsData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }));
                  }}
                  name="title"
                  label="Titulli i lajmit"
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  multiline
                  size="small"
                  name="content"
                  rows={8}
                  value={newsData.content}
                  onChange={(e) => {
                    setNewsData((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }));
                  }}
                  label="Pershkrimi"
                />
              </Grid>
              {/* <Grid item sm={12} md={12}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Disponueshmeria
                  </FormLabel>
                  <RadioGroup
                    value={newsData.isSold}
                    row={true}
                    onChange={(e) => {
                      setNewsData((prev) => ({
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
              </Grid> */}
            </Grid>
          </Box>
        </Box>

        <Box display={"flex"} gap={2}>
          <Button variant="contained" onClick={handleSubmit}>
            Ruaj
          </Button>
          <Button
            onClick={() => {
              dispatch(setNewsModalStatus(false));
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

export default AdmNewsModal