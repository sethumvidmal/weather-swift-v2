import React from "react";
import { Box, Card, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const ForecastCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  height: "100%",
}));

const ForecastWeather = ({ data }) => {
  if (!data?.forecast?.forecastday) return null;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        3-Day Forecast
      </Typography>
      <Grid container spacing={2}>
        {data.forecast.forecastday.map((day) => (
          <Grid item xs={12} sm={4} key={day.date}>
            <ForecastCard elevation={0}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="subtitle1">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
                <Box sx={{ my: 2 }}>
                  <img
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                    style={{ width: 64, height: 64 }}
                  />
                </Box>
                <Typography variant="h6">{day.day.maxtemp_c}°C</Typography>
                <Typography variant="body2" color="text.secondary">
                  {day.day.mintemp_c}°C
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Wind: {day.day.maxwind_mph} mph
                  </Typography>
                  <Typography variant="body2">
                    Humidity: {day.day.avghumidity}%
                  </Typography>
                </Box>
              </Box>
            </ForecastCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ForecastWeather;
