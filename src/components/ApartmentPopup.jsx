import { Box, Typography } from "@mui/material";
import { homepage, planmetricImageUrl } from "../utils/consts";

const ApartmentPopup = ({ apartment, mousePosition }) => {
  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: mousePosition.y - 30 + "px",
        left: mousePosition.x + 40 + "px",
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          width: "260px",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",

          backgroundColor: "#fff",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#7a0c2a91",
            padding: "8px 12px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#f5cba7",
            }}
          >
            {apartment.title}
          </Typography>
        </Box>

        <Box
          sx={{
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <Typography sx={{ fontSize: "14px", color: "#333" }}>
            <strong>Sipërfaqja:</strong> {apartment.sqft}m<sup>2</sup>
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#333" }}>
            <strong>Kati:</strong> {apartment.floor}
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#333" }}>
            <strong>Tipi:</strong> {apartment.bedroom}
          </Typography>
        </Box>
        <Box sx={{ padding: "0 12px 12px 12px" }}>
          <img
            src={`${homepage}${planmetricImageUrl}${apartment.name}.png`}
            alt="Apartment Plan"
            style={{ width: "100%", borderRadius: "4px" }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default ApartmentPopup;
