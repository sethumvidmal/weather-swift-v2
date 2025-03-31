import { Box, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import PropTypes from 'prop-types';

const GlassBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(0, 0, 0, 0.3)' 
    : 'rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(209, 213, 219, 0.3)'}`,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
  },
}));

const AstronomyInfo = ({ data }) => {
  const theme = useTheme();
  const { astronomy } = data;
  const { astro } = astronomy;

  const getMoonPhaseIcon = (phase) => {
    switch (phase.toLowerCase()) {
      case 'new moon':
        return '🌑';
      case 'waxing crescent':
        return '🌒';
      case 'first quarter':
        return '🌓';
      case 'waxing gibbous':
        return '🌔';
      case 'full moon':
        return '🌕';
      case 'waning gibbous':
        return '🌖';
      case 'last quarter':
        return '🌗';
      case 'waning crescent':
        return '🌘';
      default:
        return '🌑';
    }
  };

  return (
    <GlassBox>
      <Typography variant="h6" gutterBottom>
        Astronomy
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <InfoRow>
          <WbSunnyIcon color="warning" />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Sunrise
            </Typography>
            <Typography>{astro.sunrise}</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Typography variant="body2" color="text.secondary">
              Sunset
            </Typography>
            <Typography>{astro.sunset}</Typography>
          </Box>
        </InfoRow>

        <InfoRow>
          <DarkModeIcon color="primary" />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Moonrise
            </Typography>
            <Typography>{astro.moonrise}</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Typography variant="body2" color="text.secondary">
              Moonset
            </Typography>
            <Typography>{astro.moonset}</Typography>
          </Box>
        </InfoRow>

        <InfoRow>
          <NightsStayIcon />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Moon Phase
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {astro.moon_phase} {getMoonPhaseIcon(astro.moon_phase)}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Typography variant="body2" color="text.secondary">
              Illumination
            </Typography>
            <Typography>{astro.moon_illumination}%</Typography>
          </Box>
        </InfoRow>
      </Box>
    </GlassBox>
  );
};

AstronomyInfo.propTypes = {
  data: PropTypes.shape({
    astronomy: PropTypes.shape({
      astro: PropTypes.shape({
        sunrise: PropTypes.string.isRequired,
        sunset: PropTypes.string.isRequired,
        moonrise: PropTypes.string.isRequired,
        moonset: PropTypes.string.isRequired,
        moon_phase: PropTypes.string.isRequired,
        moon_illumination: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default AstronomyInfo;
