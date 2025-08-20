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
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import ApartmentPopup from "./ApartmentPopup";
import { handleFilterState, handleRegularFilterReset, maxFloor, maxSquare, minFloor, minSquare, setRegularFloorFilter, setRegularRoomFilter, setRegularSquareFilter } from '../features/filter/FilterSlice';


const Building = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [squareRange, setSquareRange] = useState([minSquare, maxSquare]);
  const [floorRange, setFloorRange] = useState([minFloor, maxFloor]);
  const [isVisible, setIsVisible] = useState(true);
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
    data: {}
  });
  const [popup, setPopup] = useState({
    anchorEl: null,
    open: false,
    data: {}
  })

  
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
  }, [dispatch, id])


  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % buildingData.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => ((prevIndex - 1) + buildingData.length) % buildingData.length);
  };

  const getSvgHeight = () => {
    return '100%';
  };

  const handleContextMenu = (e, data) => {
    e.preventDefault();
    setContextMenu({
      anchorEl: e.currentTarget,
      open: true,
      data: data
    });
  };


  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };


  const buildingData = useSelector(getAllApartmentSvgData);

  const handleRoomChange = (event) => {
    if (event.target.name === 'all') {
      setRoomRange(['all']);
    } else {
      setRoomRange((prev) => {
        if (prev.includes('all')) {
          return [event.target.name];
        } else if (prev.length === 0) {
          return [event.target.name];
        } else if (prev.length === 1 && prev[0] === event.target.name) {
          return ['all'];
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

  const handleApplyChanges = () => {
    
  }

const resetFilters = () => {
    setSquareRange([minSquare, maxSquare]);
    setFloorRange([minFloor, maxFloor]);
    setRoomRange(['all']);
    
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
          top: "50%",
          cursor: "pointer",
          fill: "#f5cba7",
          fontSize: "35px",
          ":hover": {
            backgroundColor: "white",
            fill: "#782137",
          },
        }}
      >
        <SlArrowLeft style={{
          color: "#f5cba7",
          height: "24px",
        }}/>
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
          top: "50%",
          cursor: "pointer",
          fontSize: "35px",
          fill: "#f5cba7",
          ":hover": {
            backgroundColor: "white",
            fill: "#782137",
          },
        }}
      >
        <SlArrowRight style={{
          color: "#f5cba7",
          height: "24px",
        }}/>
      </Button>
        <Box sx={{
          width: "100%",
        }}>
        {buildingData?.map((building, index) =>
          <div
            key={building.buildingName}
            style={{
              height: index === currentIndex ? getSvgHeight() : "0px",
              opacity: currentIndex === index ? 1 : 0,
              transition: "opacity 0.1s ease-in-out",
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              overflow: 'auto'
            }}
          >
            <svg
              width={"100%"}
              height={"100%"}
              viewBox={building.viewBoxStyle}
            >
              <image
                xlinkHref={`${imagePath}${building.buildingNr}-${building.buildingSide}.jpg`}
                alt=""
                width={building.imgWidth}
                height={building.imgHeight}
                transform={building.imgTransform}
              />
              {building?.apartmentList?.map((apartment) => {
                if (apartment.pointsType === 'path') {
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
                            ? "reserved" : filterState
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
                              navigateTo: () => navigate(`/apartments/${apartment.id}`),
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
                          navigate(`/apartment/${apartment.id}`)
                        }
                      }}
                    />
                  );
                }
              })
              }
            </svg>
          </div>
        )}
        </Box>
      <>
        <Button
          onClick={() => setIsVisible((prev) => !prev)}
          sx={{
            position: "fixed",
            bottom: isSmallDev ? "0px" : isVisible ? "110px" : "0px",
            left: "0px",
            width: isSmallDev ? "100%" : "5%",
            zIndex: 10,
            fontSize: "12px",
            backgroundColor: "#782137", // Keeping your original colors
            color: "white",
            zIndex: 9999,
            padding: "10px",
            transition: "bottom 0.5s ease",
            "&:hover": {
              backgroundColor: "#5a1828",
            },
          }}
        >
          {isVisible ? "Hide" : "Filters"}
        </Button>

        <Box
          sx={{
            position: "fixed",
            left: "0px",
            width: "100%",
            backgroundColor: "#782137", // Keeping your original colors
            display: "flex",
            flexDirection: isSmallDev ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 50px",
            height: isSmallDev ? "100%" : "auto",
            bottom: "0px",
            transform: isVisible ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.5s ease",
            gap: "20px",
            zIndex: 999,
          }}
        >
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              width: isSmallDev ? "100%" : "15%",
            }}
          >
            <Typography sx={{ color: "white" }}>BEDROOMS</Typography>
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
                  style={{
                    width: isSmallDev ? "100%" : "50px",
                    height: "40px",
                    backgroundColor: "transparent",
                    color: "white",
                    border: "1px solid white",
                  }}
                >
                  {num}
                </button>
              ))}
            </Box>
          </Box> */}
          <div className="w-full md:w-auto flex flex-col items-start gap-1 md:gap-4">
            <h1 className="text-lg text-secondaryTxt">Bedrooms</h1>
            <div className='w-full flex gap-2 justify-start valky'>
              <button name='1' onClick={handleRoomChange} className={`cursor-pointer h-12 w-12 border border-secondaryTxt ${roomRange.includes('1') ? 'bg-primary text-white' : 'bg-brand text-primary'}`}>1</button>
              <button name='2' onClick={handleRoomChange} className={`cursor-pointer h-12 w-12 border border-secondaryTxt ${roomRange.includes('2') ? 'bg-primary text-white' : 'bg-brand text-primary'}`}>2</button>
              <button name='3' onClick={handleRoomChange} className={`cursor-pointer h-12 w-12 border border-secondaryTxt ${roomRange.includes('3') ? 'bg-primary text-white' : 'bg-brand text-primary'}`}>3</button>
              <button name='4' onClick={handleRoomChange} className={`cursor-pointer h-12 w-12 border border-secondaryTxt ${roomRange.includes('4') ? 'bg-primary text-white' : 'bg-brand text-primary'}`}>4</button>
            </div>
          </div>
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              width: isSmallDev ? "100%" : "30%",
            }}
          >
            <Typography sx={{ color: "white" }}>FLOOR RANGE</Typography>
            <Slider
              min={minFloor}
              max={maxFloor}
              value={floorRange}
              onChange={handleFloorChange}
              valueLabelDisplay="auto"
              sx={{
                color: "#C1AC40",
                "& .MuiSlider-thumb": {
                  backgroundColor: "#ffffff",
                  border: "2px solid white",
                },
                "& .MuiSlider-track": {
                  color: "white",
                },
                "& .MuiSlider-rail": {
                  color: "white",
                },
              }}
            />
          </Box> */}
          <div className="w-full md:w-auto flex flex-col items-start gap-1 md:gap-4">
            <h1 className="text-lg text-secondaryTxt">Floor Range</h1>
            <div className='w-full md:w-96 flex flex-col justify-between items-center'>
              <div className="w-full">
                <Slider
                  getAriaLabel={() => "Floor range"}
                  value={floorRange}
                  shiftStep={1}
                  onChange={handleFloorChange}
                  step={1}
                  min={minFloor}
                  max={maxFloor}
                  color="var(--color-primary)"
                  sx={{
                    color: "var(--color-primary)",
                    height: '1px',
                    width: '100%'
                  }}
                />
              </div>
              <p className='text-lg valky capitalize text-secondaryTxt'>
                {floorRange[0]} - {floorRange[1]}
              </p>
            </div>
          </div>
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              width: isSmallDev ? "100%" : "30%",
            }}
          >
            <Typography sx={{ color: "white" }}>AREA RANGE</Typography>
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
                  backgroundColor: "#ffffff",
                  border: "2px solid white",
                },
                "& .MuiSlider-track": {
                  color: "white",
                },
                "& .MuiSlider-rail": {
                  color: "white",
                },
              }}
            />
          </Box> */}
          <div className="w-full md:w-auto flex flex-col items-start gap-1 md:gap-4">
            <h1 className="text-lg text-secondaryTxt">Area Range</h1>
            <div className='w-full md:w-96 flex flex-col justify-between items-center'>
              <div className="w-full">
                <Slider
                  getAriaLabel={() => "Size range"}
                  value={squareRange}
                  onChange={handleSizeChange}
                  shiftStep={1}
                  step={10}
                  min={minSquare}
                  max={maxSquare}
                  color="var(--color-primary)"
                  sx={{
                    color: "var(--color-primary)",
                    height: '1px',
                    width: '100%'
                  }}
                />
              </div>
              <p className='text-lg valky capitalize text-secondaryTxt'>
                {squareRange[0]}m2 - {squareRange[1]}m2
              </p>
            </div>
          </div>
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: isSmallDev ? "row" : "column",
              gap: "15px",
              justifyContent: "center",
              alignItems: "center",
              width: isSmallDev ? "100%" : "5%",
              marginBottom: isSmallDev ? "50px" : "0px",
            }}
          >
            <Typography sx={{ color: "white" }}>Hide All</Typography>
            <input
              type="checkbox"
              // onChange={(e) => setIsVisible(!e.target.checked)}
            />
          </Box> */}
          <div className="h-full w-full md:w-auto flex items-end justify-end md:justify-center gap-1 md:gap-4 md:pb-2">
            <button
            onClick={resetFilters}
              className="text-white h-10 w-30 px-4 py-2 rounded-full border border-primary hover:bg-primary transition"
            >
              Reseto
            </button>
            {/* <button
              onClick={handleApplyChanges}
              className="bg-primary text-white h-10 w-50 px-4 py-2 rounded-full border border-primary"
            >
              Apliko Ndryshimet
            </button> */}
          </div>
        </Box>
      </>
      <ContextMenu menu={contextMenu} setMenu={setContextMenu} />
      {popup.open && <ApartmentPopup apartment={popup.data} mousePosition={mousePosition} />}
      <AdmApartmentModal />
    </Box>
  );
};

export default Building;
