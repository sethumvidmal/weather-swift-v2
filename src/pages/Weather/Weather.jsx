import { Box, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import CurrentWeather from "../../components/CurrentWeather";
import ForecastWeather from "../../components/ForecastWeather";
import SearchBar from "../../components/SearchBar";
import { getCurrentWeather, getForecastWeather } from "../../services/api";

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (location) => {
    try {
      setLoading(true);
      setError(null);
      const [current, forecast] = await Promise.all([
        getCurrentWeather(location),
        getForecastWeather(location),
      ]);
      setCurrentWeather(current);
      setForecast(forecast);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData("colombo");
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <SearchBar onSearch={fetchWeatherData} />
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ color: "error.main", textAlign: "center", py: 4 }}>
          {error}
        </Box>
      ) : (
        <>
          <CurrentWeather data={currentWeather} />
          <ForecastWeather data={forecast} />
        </>
      )}
    </Container>
  );
};

export default Weather;
