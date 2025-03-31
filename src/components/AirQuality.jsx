import { Box, Typography, LinearProgress, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import AirIcon from "@mui/icons-material/Air";
import PropTypes from "prop-types";

const GlassBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.3)"
      : "rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(10px)",
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(209, 213, 219, 0.3)"
  }`,
}));

const getAqiColor = (aqi) => {
  if (aqi <= 50) return "#4caf50"; // Good
  if (aqi <= 100) return "#ffeb3b"; // Moderate
  if (aqi <= 150) return "#ff9800"; // Unhealthy for Sensitive Groups
  if (aqi <= 200) return "#f44336"; // Unhealthy
  if (aqi <= 300) return "#9c27b0"; // Very Unhealthy
  return "#880e4f"; // Hazardous
};

const getAqiText = (aqi) => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};

const AirQuality = ({ data }) => {
  const theme = useTheme();
  const { air_quality } = data.current;

  // US EPA standard
  const aqi = Math.round(air_quality["us-epa-index"]);
  const pm2_5 = Math.round(air_quality.pm2_5);
  const pm10 = Math.round(air_quality.pm10);
  const no2 = Math.round(air_quality.no2);
  const o3 = Math.round(air_quality.o3);
  const so2 = Math.round(air_quality.so2);
  const co = Math.round(air_quality.co);

  return (
    <GlassBox>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <AirIcon />
        <Typography variant="h6">Air Quality</Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Air Quality Index (US EPA)
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: getAqiColor(aqi),
              fontWeight: "bold",
            }}
          >
            {getAqiText(aqi)}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={(aqi / 500) * 100}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
            "& .MuiLinearProgress-bar": {
              backgroundColor: getAqiColor(aqi),
            },
          }}
        />
      </Box>

      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}
      >
        <Box>
          <Typography variant="body2" color="text.secondary">
            PM2.5
          </Typography>
          <Typography>{pm2_5} µg/m³</Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            PM10
          </Typography>
          <Typography>{pm10} µg/m³</Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            NO₂
          </Typography>
          <Typography>{no2} µg/m³</Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            O₃
          </Typography>
          <Typography>{o3} µg/m³</Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            SO₂
          </Typography>
          <Typography>{so2} µg/m³</Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            CO
          </Typography>
          <Typography>{co} µg/m³</Typography>
        </Box>
      </Box>
    </GlassBox>
  );
};

AirQuality.propTypes = {
  data: PropTypes.shape({
    current: PropTypes.shape({
      air_quality: PropTypes.shape({
        "us-epa-index": PropTypes.number.isRequired,
        pm2_5: PropTypes.number.isRequired,
        pm10: PropTypes.number.isRequired,
        no2: PropTypes.number.isRequired,
        o3: PropTypes.number.isRequired,
        so2: PropTypes.number.isRequired,
        co: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default AirQuality;
