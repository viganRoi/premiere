import {
  Box,
  Button,
  Checkbox,
  Icon,
  Slider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getObjectSvgDataAll } from "../features/apartment/ApartmentAPI";
import { getAllApartmentSvgData } from "../features/apartment/ApartmentSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { imagePath } from "../utils/consts";
import AdmApartmentModal from "../admin/apartments/AdmApartmentModal";
import ContextMenu from "./ContextMenu";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import ApartmentPopup from "./ApartmentPopup";
import {
  handleFilterState,
  handleRegularFilterReset,
  maxFloor,
  maxSquare,
  minFloor,
  minSquare,
  setRegularFloorFilter,
  setRegularRoomFilter,
  setRegularSquareFilter,
} from "../features/filter/FilterSlice";

const Building = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [squareRange, setSquareRange] = useState([minSquare, maxSquare]);
  const [floorRange, setFloorRange] = useState([minFloor, maxFloor]);
  const [isVisible, setIsVisible] = useState(false);
  const [roomRange, setRoomRange] = useState(["all"]);
  // const [roomFilter, setRoomFilter] = useState(['all']);
  const isSmallDev = useMediaQuery("(max-width: 768px)");
  const filterState = false;
  const { id } = useParams();
  // const buildingData = useSelector(getAllApartmentSvgData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contextMenu, setContextMenu] = useState({
    anchorEl: null,
    open: false,
    data: {},
  });
  const [popup, setPopup] = useState({
    anchorEl: null,
    open: false,
    data: {},
  });

  // const handleSizeChange = (event, newSizeRange) => {
  //   setSquareRange(newSizeRange);
  // };

  // const handleFloorChange = (event, newFloorRange) => {
  //   setFloorRange(newFloorRange);
  // };

  useEffect(() => {
    if (id) {
      dispatch(getObjectSvgDataAll(id));
    }
  }, [dispatch, id]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % buildingData.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + buildingData.length) % buildingData.length,
    );
  };

  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const getSvgHeight = () => {
    return "100%";
  };

  const handleContextMenu = (e, data) => {
    e.preventDefault();
    setContextMenu({
      anchorEl: e.currentTarget,
      open: true,
      data: data,
    });
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleToggle = (num) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  const buildingData = useSelector(getAllApartmentSvgData);

  const handleRoomChange = (event) => {
    if (event.target.name === "all") {
      setRoomRange(["all"]);
    } else {
      setRoomRange((prev) => {
        if (prev.includes("all")) {
          return [event.target.name];
        } else if (prev.length === 0) {
          return [event.target.name];
        } else if (prev.length === 1 && prev[0] === event.target.name) {
          return ["all"];
        }
        if (prev.includes(event.target.name)) {
          return prev.filter((room) => room !== event.target.name);
        } else {
          return [...prev, event.target.name];
        }
      });
    }
  };

  const handleFloorChange = (event, newFloorRange) => {
    setFloorRange(newFloorRange);
  };

  const handleSizeChange = (event, newSizeRange) => {
    setSquareRange(newSizeRange);
  };
  const floorLabelMapping = {
    0: "Përdhesa",
    "-1": "Suterren",
    "-2": "Bodrum",
  };

  const handleApplyChanges = () => {};

  const resetFilters = () => {
    setSquareRange([minSquare, maxSquare]);
    setFloorRange([minFloor, maxFloor]);
    setRoomRange(["all"]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        padding: "0",
        position: "relative",
        alignItems: "start",
        height: "100%",
      }}
    >
      <Button
        onClick={handlePrevious}
        sx={{
          width: "50px",
          minWidth: "20px",
          height: "50px",
          backgroundColor: "#782137",
          borderRadius: "50px",
          left: "10px",
          position: "fixed",
          top: isSmallDev ? "65%" : "50%",
          cursor: "pointer",
          fill: "#f5cba7",
          fontSize: "35px",
          ":hover": {
            backgroundColor: "white",
            fill: "#782137",
          },
        }}
      >
        <SlArrowLeft
          style={{
            color: "#f5cba7",
            height: "24px",
          }}
        />
      </Button>
      <Button
        onClick={handleNext}
        sx={{
          width: "50px",
          height: "50px",
          backgroundColor: "#782137",
          minWidth: "20px",
          borderRadius: "50px",
          position: "fixed",
          right: "10px",
          top: isSmallDev ? "65%" : "50%",
          cursor: "pointer",
          fontSize: "35px",
          fill: "#f5cba7",
          ":hover": {
            backgroundColor: "white",
            fill: "#782137",
          },
        }}
      >
        <SlArrowRight
          style={{
            color: "#f5cba7",
            height: "24px",
          }}
        />
      </Button>
      <Box
        sx={{
          width: "100%",
        }}
      >
        {buildingData?.map((building, index) => (
          <div
            key={building.buildingName}
            style={{
              height: index === currentIndex ? getSvgHeight() : "0px",
              opacity: currentIndex === index ? 1 : 0,
              transition: "opacity 0.1s ease-in-out",
              width: isSmallDev ? "200%" : "100%",
              display: "flex",
              justifyContent: "center",
              overflow: "auto",
            }}
          >
            <svg width={"100%"} height={"100%"} viewBox={building.viewBoxStyle}>
              <image
                xlinkHref={`${imagePath}${building.buildingNr}-${building.buildingSide}.jpg`}
                alt=""
                width={building.imgWidth}
                height={building.imgHeight}
                transform={building.imgTransform}
              />
              {building?.apartmentList?.map((apartment) => {
                if (apartment.pointsType === "path") {
                  return (
                    <path
                      key={apartment.id}
                      d={apartment.path}
                      onContextMenu={(e) => handleContextMenu(e, apartment)}
                      className={
                        parseInt(apartment.floorNumber) >= floorRange[0] &&
                        parseInt(apartment.floorNumber) <= floorRange[1] &&
                        (roomRange.includes(apartment.rooms) ||
                          roomRange.includes("all")) &&
                        parseInt(apartment.square) >= squareRange[0] &&
                        parseInt(apartment.square) <= squareRange[1]
                          ? apartment.isSold
                            ? "sold"
                            : apartment.isReserved
                              ? "reserved"
                              : filterState
                                ? "available"
                                : "available"
                          : "disabled"
                      }
                      id={apartment.apartmentId}
                      onMouseEnter={(e) => {
                        e.preventDefault();
                        setPopup({
                          data: {
                            image: apartment.imageUrl,
                            title: apartment.apartmentNumber,
                            navigateTo: () =>
                              navigate(`/apartments/${apartment.id}`),
                            sqft: apartment.square,
                            bedroom: apartment.rooms,
                            floor: apartment.floorNumber,
                            name: apartment.name,
                          },
                          open: true,
                          x: e.clientX + 10,
                          y: e.clientY + 10,
                        });
                      }}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={() => {
                        setPopup({
                          x: 0,
                          y: 0,
                          open: false,
                          data: {},
                        });
                      }}
                      onClick={() => {
                        if (
                          parseInt(apartment.floorNumber) >= floorRange[0] &&
                          parseInt(apartment.floorNumber) <= floorRange[1] &&
                          (roomRange.includes(apartment.rooms) ||
                            roomRange.includes("all")) &&
                          parseInt(apartment.square) >= squareRange[0] &&
                          parseInt(apartment.square) <= squareRange[1] &&
                          !apartment.isSold
                        ) {
                          // handleApartmentClick(apartment)
                          navigate(`/apartment/${apartment.id}`);
                        }
                      }}
                    />
                  );
                }
              })}
            </svg>
          </div>
        ))}
      </Box>
      <>
        <Button
          onClick={() => setIsVisible((prev) => !prev)}
          sx={{
            position: "fixed",
            top: isSmallDev ? "65%" : isVisible ? "150px" : "150px",
            right: isSmallDev ? "35%" : "10px",
            width: isSmallDev ? "30%" : "15%",
            fontSize: "15px",
            borderRadius: "30px",
            backgroundColor: "#782137", // Keeping your original colors
            color: "white",
            zIndex: 99,
            padding: "10px 35px",
            transition: "bottom 0.5s ease",
            "&:hover": {
              backgroundColor: "#5a1828",
            },
          }}
        >
          {isVisible ? "Hide" : "Filtro"}
        </Button>

        <Box
          sx={{
            position: "fixed",
            right: isSmallDev ? "0" : "10px",
            width: isSmallDev ? "100%" : "25%",
            backgroundColor: "#782137", // Keeping your original colors
            display: "flex",
            flexDirection: "column",
            justifyContent: isSmallDev ? "space-around" : "space-between",
            alignItems: "center",
            padding: "20px 50px",
            borderRadius: "10px",
            height: isSmallDev ? "100%" : "70%",
            top: isSmallDev ? "0px" : "150px",
            transform: isVisible ? "translateY(0)" : "translateY(150%)",
            transition: "transform 0.5s right",
            zIndex: 999,
          }}
        >
          <Box sx={{ position: "absolute", right: "0px", top: "0px" }}>
            <Button
              onClick={() => setIsVisible(!isVisible)}
              sx={{
                color: "white",
                height: "35px",
                padding: "0",
                minWidth: "35px",
                borderRadius: "0px",
                borderBottomLeftRadius: "10px",

                bgcolor: "white",
                color: "black",
                fontSize: "12px",
              }}
            >
              X
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              width: "100%",
            }}
          >
            <Typography sx={{ color: "white" }}>DHOMA</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: isSmallDev ? "column" : "row",
                justifyContent: "space-between",
                gap: "7px",
              }}
            >
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => handleToggle(num)}
                  style={{
                    width: "100%",
                    height: "40px",
                    backgroundColor: selectedNumbers.includes(num)
                      ? "#d3b298"
                      : "transparent",
                    color: selectedNumbers.includes(num)
                      ? "#782137"
                      : "#d3b298",
                    border: "1px solid #d3b298",
                  }}
                >
                  {num}
                </button>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              width: "100%",
            }}
          >
            <Typography sx={{ color: "white" }}>KATI</Typography>
            <Slider
              min={minFloor}
              max={maxFloor}
              value={floorRange}
              onChange={handleFloorChange}
              valueLabelDisplay="auto"
              sx={{
                color: "#C1AC40",
                "& .MuiSlider-thumb": {
                  backgroundColor: "#d3b298",
                  border: "2px solid #d3b298",
                },
                "& .MuiSlider-track": {
                  color: "#d3b298",
                },
                "& .MuiSlider-rail": {
                  color: "#d3b298",
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              width: "100%",
            }}
          >
            <Typography sx={{ color: "white", textTransform: "uppercase" }}>
              SIPëRFAQJA
            </Typography>
            <Slider
              aria-label="Default"
              min={minSquare}
              step={0.1}
              max={maxSquare}
              value={squareRange}
              onChange={handleSizeChange}
              valueLabelDisplay="auto"
              sx={{
                color: "#C1AC40",
                "& .MuiSlider-thumb": {
                  backgroundColor: "#d3b298",
                  border: "2px solid #d3b298",
                },
                "& .MuiSlider-track": {
                  color: "#d3b298",
                },
                "& .MuiSlider-rail": {
                  color: "#d3b298",
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: isSmallDev ? "row" : "row",
              gap: "15px",
              justifyContent: "center",
              alignItems: "center",
              width: isSmallDev ? "100%" : "85%",
              marginBottom: isSmallDev ? "50px" : "0px",
            }}
          >
            <Button
              sx={{ color: "white", border: "1px solid white", width: "100%" }}
              onClick={() => setIsVisible(!isVisible)}
            >
              Filtro
            </Button>

            <Button
              onClick={() => {
                resetFilters();
              }}
              sx={{ color: "white", border: "1px solid white", width: "100%" }}
            >
              Reseto
            </Button>
          </Box>
        </Box>
      </>
      <ContextMenu menu={contextMenu} setMenu={setContextMenu} />
      {popup.open && (
        <ApartmentPopup apartment={popup.data} mousePosition={mousePosition} />
      )}
      <AdmApartmentModal />
    </Box>
  );
};

export default Building;
