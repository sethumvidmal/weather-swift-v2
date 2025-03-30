import {
  Box,
  Card,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const WeatherCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const WeatherInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: theme.spacing(1),
  backdropFilter: "blur(5px)",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.75),
  },
}));

const CurrentWeather = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!data) return null;

  return (
    <WeatherCard elevation={0}>
      <Grid container spacing={isMobile ? 2 : 3}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "center" : "flex-start",
              gap: 2,
            }}
          >
            <Typography variant={isMobile ? "h3" : "h2"}>
              {data.current.temp_c}°C
            </Typography>
            {data.current.condition.icon && (
              <img
                src={data.current.condition.icon}
                alt={data.current.condition.text}
                style={{
                  width: isMobile ? 48 : 64,
                  height: isMobile ? 48 : 64,
                }}
              />
            )}
          </Box>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{
              mt: 1,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            {data.current.condition.text}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: isMobile ? "center" : "left",
            }}
          >
            {data.location.name}, {data.location.country}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <WeatherInfo>
                <Typography variant="body2">Wind:</Typography>
                <Typography variant="body1">
                  {data.current.wind_mph} mph
                </Typography>
              </WeatherInfo>
            </Grid>
            <Grid item xs={12} sm={6}>
              <WeatherInfo>
                <Typography variant="body2">Humidity:</Typography>
                <Typography variant="body1">
                  {data.current.humidity}%
                </Typography>
              </WeatherInfo>
            </Grid>
            <Grid item xs={12} sm={6}>
              <WeatherInfo>
                <Typography variant="body2">Pressure:</Typography>
                <Typography variant="body1">
                  {data.current.pressure_mb} mb
                </Typography>
              </WeatherInfo>
            </Grid>
            <Grid item xs={12} sm={6}>
              <WeatherInfo>
                <Typography variant="body2">UV Index:</Typography>
                <Typography variant="body1">{data.current.uv}</Typography>
              </WeatherInfo>
            </Grid>
            <Grid item xs={12} sm={6}>
              <WeatherInfo>
                <Typography variant="body2">Cloud Cover:</Typography>
                <Typography variant="body1">{data.current.cloud}%</Typography>
              </WeatherInfo>
            </Grid>
            <Grid item xs={12} sm={6}>
              <WeatherInfo>
                <Typography variant="body2">Precipitation:</Typography>
                <Typography variant="body1">
                  {data.current.precip_mm} mm
                </Typography>
              </WeatherInfo>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </WeatherCard>
  );
};

CurrentWeather.propTypes = {
  data: PropTypes.shape({
    current: PropTypes.shape({
      temp_c: PropTypes.number.isRequired,
      condition: PropTypes.shape({
        text: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      }).isRequired,
      wind_mph: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      pressure_mb: PropTypes.number.isRequired,
      uv: PropTypes.number.isRequired,
      cloud: PropTypes.number.isRequired,
      precip_mm: PropTypes.number.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

CurrentWeather.defaultProps = {
  data: null,
};

export default CurrentWeather;
