import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import Gallery from "../components/Gallery";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL, homepage, imagePath, mainUrl, objectImageUrl, planmetricImageUrl } from "../utils/consts";

const SingleApartmentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isSmallDev = useMediaQuery("(max-width: 768px)");
  const [data, setData] = React.useState(null);

  useEffect(() => {
    if(id) {
      axios.get(`${BASE_URL}/api/apartment/getbyid?id=${id}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching apartment data:", error);
        });
    }
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          padding: isSmallDev
            ? "120px 50px 40px 50px"
            : "200px 200px 0px 200px",
          display: "flex",
          position: "relative",
          width: "100%",
          backgroundSize: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "start",
          backgroundImage: "url('/projektet/images/foto1.jpg')",
          backgroundPosition: "center",
          backgroundColor: "#6a0c2a",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#6a0c2a",
            opacity: "0.9",
            zIndex: 1,
          }}
        />

        <Typography
          sx={{
            fontSize: isSmallDev ? "20px" : "54px",
            color: "white",
            fontFamily: "Montserrat, Sans-serif",
            fontWeight: "600",
            zIndex: "999",
          }}
        >
          NDERTESA: L1
        </Typography>
        <Button
          sx={{
            fontFamily: "montserrat",
            fontWeight: "400",
            color: "#f2ca94",
            border: "1px solid #f2ca94",
            borderRadius: "1px",
            fontSize: "13px",
            backgroundColor: "transparent",
            zIndex: "999",
            ":hover": {
              backgroundColor: "#f2ca94",
              color: "#6a0c2a",
            },
          }}
          onClick={() => (navigate(-1))}
        >
          KTHEHU PAS
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallDev ? "column" : "row",
          padding: isSmallDev ? "0px" : "100px",
          justifyContent: "center",
          alignItems: "center",
          // maxWidth: "1140px",
        }}
      >
        <Box sx={{ display: "flex", flex: "6" }}>
          <img 
          style={{ width: "100%",
            height: "100%",
            objectFit: "contain",
           }} 
          // src="/projektet/images/plani.png" 
          src={`${homepage}${planmetricImageUrl}${data.name}.png`}
          alt="" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: "6",
            gap: "30px",
            padding: isSmallDev ? "0px" : "50px 100px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              borderBottom: "1px solid #f2ca94",
              gap: "20px",
              paddingBottom: "20px",
            }}
          >
            <Button
              sx={{
                backgroundColor: "#f2ca94",
                color: "#6a0c2a",
                border: "1px solid #f2ca94",
                fontSize: isSmallDev ? "13px" : "15px",
                padding: "10px 24px",
                borderRadius: "1px",
                fontWeight: "400",
                fontFamily: "Montserrat, Sans-serif",
                ":hover": {
                  backgroundColor: "white",
                  color: "#f2ca94",
                },
              }}
            >
              SHKARKO PDF
            </Button>
            <Button
              sx={{
                backgroundColor: "#6a0c2a",
                color: "#f2ca94",
                border: "1px solid #6a0c2a",
                fontSize: isSmallDev ? "13px" : "15px",
                padding: "10px 24px",
                fontWeight: "400",
                fontFamily: "Montserrat, Sans-serif",
                ":hover": {
                  backgroundColor: "white",
                  color: "#6a0c2a",
                },
              }}
            >
              NA KONTAKTONI
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                width: isSmallDev ? "120px" : "150px",
              }}
              className="infokatror"
            >
              <img style={{ width: "80px" }} src="/projektet/images/qelsi.png" alt="" />
              <Typography
                sx={{
                  fontFamily: "Montserrat, Sans-serif",
                  fontSize: isSmallDev ? "15px" : "20px",
                  fontWeight: "400",
                  color: "#181818",
                }}
              >
                Njesia
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Montserrat, Sans-serif",
                  fontSize: isSmallDev ? "17px" : "23px",
                  fontWeight: "600",
                }}
              >
                {data.name}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                width: isSmallDev ? "120px" : "150px",
              }}
              className="infokatror"
            >
              <img
                style={{ width: "80px" }}
                src="/projektet/images/siperfaqja.png"
                alt=""
              />

              <Typography
                sx={{
                  fontFamily: "Montserrat, Sans-serif",
                  fontSize: isSmallDev ? "15px" : "20px",
                  fontWeight: "400",
                }}
              >
                Siperfaqja(bruto)
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Montserrat, Sans-serif",
                  fontSize: isSmallDev ? "17px" : "23px",
                  fontWeight: "600",
                }}
              >
                {parseFloat(data.square).toFixed(2)} m<sup>2</sup>
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                width: isSmallDev ? "120px" : "150px",
              }}
              className="infokatror"
            >
              <img style={{ width: "80px" }} src="/projektet/images/terasa.png" alt="" />

              <Typography
                sx={{
                  fontFamily: "Montserrat, Sans-serif",
                  fontSize: isSmallDev ? "15px" : "20px",
                  fontWeight: "400",
                }}
              >
                Terasa
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Montserrat, Sans-serif",
                  fontSize: isSmallDev ? "17px" : "23px",
                  fontWeight: "600",
                }}
              >
                {parseFloat(data.balconySquare).toFixed(2)} m<sup>2</sup>
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              borderBottom: "1px solid #f2ca94",
              paddingBottom: "50px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                width: isSmallDev ? "120px" : "150px",
              }}
              className="infokatror"
            >
              <img style={{ width: "80px" }} src="/projektet/images/qelsi.png" alt="" />

              <Typography
                sx={{
                  fontFamily: "Montserrat, Sans-serif",
                  fontSize: isSmallDev ? "15px" : "20px",
                  fontWeight: "400",
                }}
              >
                Ndertesa
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Montserrat, Sans-serif",
                  fontSize: isSmallDev ? "17px" : "23px",
                  fontWeight: "600",
                }}
              >
                {data.apartmentNumber}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                width: isSmallDev ? "120px" : "150px",
              }}
              className="infokatror"
            >
              <img style={{ width: "80px" }} src="/projektet/images/kati.png" alt="" />

              <Typography
                sx={{
                  fontFamily: "Montserrat, Sans-serif",
                  fontSize: isSmallDev ? "15px" : "20px",
                  fontWeight: "400",
                }}
              >
                Kati
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Montserrat, Sans-serif",
                  fontSize: isSmallDev ? "17px" : "23px",
                  fontWeight: "600",
                }}
              >
                {data.floorNumber}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                width: isSmallDev ? "120px" : "150px",
              }}
              className="infokatror"
            >
              <img style={{ width: "80px" }} src="/projektet/images/Tipi.png" alt="" />

              <Typography
                sx={{
                  fontFamily: "Montserrat, Sans-serif",
                  fontSize: isSmallDev ? "15px" : "20px",
                  fontWeight: "400",
                }}
              >
                Tipi
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Montserrat, Sans-serif",
                  fontSize: isSmallDev ? "17px" : "23px",
                  fontWeight: "600",
                }}
              >
                {data.rooms} + 1
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: isSmallDev ? "0px" : "50px 200px 100px 200px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallDev ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginTop: isSmallDev ? "50px" : "0px",
          }}
        >
          <Typography
            sx={{
              fontSize: isSmallDev ? "25px" : "32px",
              color: "#6a0c2a",
              fontWeight: "600",
              fontFamily: "Montserrat, Sans-serif",
            }}
          >
            PLANIMETRIA 3D
          </Typography>
          <Typography
            sx={{
              fontSize: isSmallDev ? "25px" : "32px",
              color: "#6a0c2a",
              fontWeight: "600",
              fontFamily: "Montserrat, Sans-serif",
            }}
          >
            GALERIA
          </Typography>
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: isSmallDev ? "column" : "row" }}
        >
          <Box sx={{ display: "flex", flex: 5 }}>
            <img style={{ width: "100%" }} src={`${mainUrl}${planmetricImageUrl}${data.imageUrl}`} alt="" />
          </Box>

          <Box sx={{ display: "flex", flex: 7, padding: "15px" }}>
            <Gallery />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleApartmentPage;
