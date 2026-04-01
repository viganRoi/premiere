import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemButton,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { data, useNavigate, useParams } from "react-router-dom";

const buttonList = ["OBJEKTI L1", "OBJEKTI L2", "OBJEKTI I1", "OBJEKTI I2"];
const Navbar = () => {
  const naviate = useNavigate();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screen
  const [selected, setSelected] = useState("");

  const toggleDrawer = (state) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(state);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "block",
        width: "100%",
        top: 0,
        padding: isMobile ? "25px 10px" : "20px 200px",
        backgroundColor: "rgba(106, 12, 42, 1)",
        color: "#fff",
        zIndex: 999,
      }}
    >
      {/* Hamburger Menu */}
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          color: "white",
          fontSize: isMobile ? "12px" : "18px",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "montserrat, sans-serif",
        }}
      >
        <MenuIcon style={{ color: "#f5cba7", marginRight: "10px" }} />
        Lista e objekteve
      </IconButton>

      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          flexGrow: 1,
          textAlign: "center",
          fontSize: isMobile ? "18px" : "32px",
          fontWeight: "bold",
        }}
      >
        LLAMELLA {selected.toUpperCase()}
      </Typography>

      {/* Contact Button */}
      <Button
        onClick={() => {
          window.open("https://premiereresidence-ks.com/na-kontaktoni");
        }}
        variant="outlined"
        sx={{
          fontSize: isMobile ? "10px" : "15px",
          display: isMobile ? "none" : "flex",
          borderColor: "#f5cba7",
          border: "2px solid #f5cba7",
          borderRadius: "0px",
          color: "#f5cba7",
          ":hover": {
            backgroundColor: "#6a0c2a",
            border: "2px solid #6a0c2a",
          },
        }}
      >
        NA KONTAKTONI
      </Button>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: isMobile ? "100%" : 400, // Full screen on mobile
            backgroundColor: "rgba(96, 0, 32, 0.7)", // Transparent overlay
            color: "white",
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            padding: "20px 10px",
            position: "relative",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{
              position: "absolute",
              top: 30,
              left: 10,
              color: "#f5cba7",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h5"
            sx={{ padding: 2, textAlign: "center", color: "#f5cba7" }}
          >
            LISTA E OBJEKTEVE
          </Typography>
          <List>
            {buttonList.map((text, index) => (
              <ListItem key={index}>
                <ListItemButton
                  sx={{
                    textAlign: "center",
                    backgroundColor: "transparent",
                    color: "#f5cba7",
                    margin: "5px 10px",
                    fontSize: isMobile ? "14px" : "15px",
                    border: "1px solid #f5cba7",
                    justifyContent: "center",
                    fontFamily: "Montserrat, Sans-serif",
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "#f5cba7",
                      color: "#6a0c2a",
                    },
                  }}
                  onClick={() => {
                    const route = text.split(" ")[1].toLowerCase();
                    setSelected(route);
                    naviate(`/${route}`);
                  }}
                >
                  {text}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;
