import { Box, Card, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const WeatherCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
}));

const WeatherInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1),
}));

const CurrentWeather = ({ data }) => {
  if (!data) return null;

  return (
    <WeatherCard elevation={0}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h2">{data.current.temp_c}°C</Typography>
            {data.current.condition.icon && (
              <img
                src={data.current.condition.icon}
                alt={data.current.condition.text}
                style={{ width: 64, height: 64 }}
              />
            )}
          </Box>
          <Typography variant="h6" sx={{ mt: 1 }}>
            {data.current.condition.text}
          </Typography>
          <Typography variant="subtitle1">
            {data.location.name}, {data.location.country}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <WeatherInfo>
                <Typography variant="body2">Wind:</Typography>
                <Typography variant="body1">
                  {data.current.wind_mph} mph
                </Typography>
              </WeatherInfo>
            </Grid>
            <Grid item xs={6}>
              <WeatherInfo>
                <Typography variant="body2">Humidity:</Typography>
                <Typography variant="body1">
                  {data.current.humidity}%
                </Typography>
              </WeatherInfo>
            </Grid>
            <Grid item xs={6}>
              <WeatherInfo>
                <Typography variant="body2">Pressure:</Typography>
                <Typography variant="body1">
                  {data.current.pressure_mb} mb
                </Typography>
              </WeatherInfo>
            </Grid>
            <Grid item xs={6}>
              <WeatherInfo>
                <Typography variant="body2">UV Index:</Typography>
                <Typography variant="body1">{data.current.uv}</Typography>
              </WeatherInfo>
            </Grid>
            <Grid item xs={6}>
              <WeatherInfo>
                <Typography variant="body2">Cloud Cover:</Typography>
                <Typography variant="body1">{data.current.cloud}%</Typography>
              </WeatherInfo>
            </Grid>
            <Grid item xs={6}>
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

export default CurrentWeather;
