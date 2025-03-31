import { useState, useEffect } from 'react';
import { Container, Box, CircularProgress, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchBar from '../../components/SearchBar';
import CurrentWeather from '../../components/CurrentWeather';
import ForecastWeather from '../../components/ForecastWeather';
import WeatherBackground from '../../components/WeatherBackground';
import AstronomyInfo from '../../components/AstronomyInfo';
import AirQuality from '../../components/AirQuality';
import WeatherAlerts from '../../components/WeatherAlerts';
import { getCurrentWeather, getForecastWeather, getAstronomy } from '../../services/api';

const Weather = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [astronomyData, setAstronomyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (location) => {
    setLoading(true);
    setError(null);
    try {
      const [current, forecast, astronomy] = await Promise.all([
        getCurrentWeather(location),
        getForecastWeather(location),
        getAstronomy(location)
      ]);
      setWeatherData(current);
      setForecastData(forecast);
      setAstronomyData(astronomy);
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
        maxWidth="lg" 
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
          <>
            {weatherData && (
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
                gap: 3 
              }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <CurrentWeather data={weatherData} />
                  {forecastData && <ForecastWeather data={forecastData} />}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {astronomyData && <AstronomyInfo data={astronomyData} />}
                  <AirQuality data={weatherData} />
                </Box>
              </Box>
            )}
            {forecastData?.alerts && <WeatherAlerts alerts={forecastData.alerts} />}
          </>
        )}
      </Container>
    </Box>
  );
};

export default Weather;
