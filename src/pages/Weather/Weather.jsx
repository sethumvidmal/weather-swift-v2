import { useState, useEffect } from 'react';
import { Container, Box, CircularProgress } from '@mui/material';
import SearchBar from '../../components/SearchBar';
import CurrentWeather from '../../components/CurrentWeather';
import ForecastWeather from '../../components/ForecastWeather';
import WeatherBackground from '../../components/WeatherBackground';
import { getCurrentWeather, getForecastWeather } from '../../services/api';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (location) => {
    setLoading(true);
    setError(null);
    try {
      const [current, forecast] = await Promise.all([
        getCurrentWeather(location),
        getForecastWeather(location)
      ]);
      setWeatherData(current);
      setForecastData(forecast);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (location) => {
    if (location && location.name) {
      fetchWeatherData(location.name);
    }
  };

  // Initial weather fetch for default location
  useEffect(() => {
    fetchWeatherData('Colombo');
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <WeatherBackground condition={weatherData?.current?.condition?.text} />
      <Container 
        maxWidth="md" 
        sx={{ 
          pt: 2, 
          pb: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 3 
        }}
      >
        <Box sx={{ 
          borderRadius: 4,
          overflow: 'hidden',
          backgroundColor: (theme) => theme.palette.mode === 'dark' 
            ? 'rgba(0, 0, 0, 0.3)' 
            : 'rgba(255, 255, 255, 0.3)',
        }}>
          <SearchBar onLocationSelect={handleLocationSelect} />
        </Box>
        
        {error && (
          <Box sx={{ 
            mt: 2, 
            p: 2, 
            bgcolor: 'error.main', 
            color: 'error.contrastText',
            borderRadius: 4,
            backdropFilter: 'blur(10px)'
          }}>
            {error}
          </Box>
        )}
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {weatherData && <CurrentWeather data={weatherData} />}
            {forecastData && <ForecastWeather data={forecastData} />}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Weather;
