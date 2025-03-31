import { useState } from 'react';
import { Box, Typography, Collapse, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/Warning';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
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
}));

const AlertBox = styled(Box)(({ theme, severity }) => {
  const getColor = () => {
    switch (severity?.toLowerCase()) {
      case 'moderate':
        return theme.palette.warning.main;
      case 'severe':
      case 'extreme':
        return theme.palette.error.main;
      default:
        return theme.palette.info.main;
    }
  };

  return {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(0, 0, 0, 0.2)' 
      : 'rgba(255, 255, 255, 0.2)',
    border: `1px solid ${getColor()}`,
    '&:last-child': {
      marginBottom: 0,
    },
  };
});

const WeatherAlerts = ({ alerts }) => {
  const [expandedAlerts, setExpandedAlerts] = useState({});

  if (!alerts?.alert?.length) {
    return null;
  }

  const toggleAlert = (index) => {
    setExpandedAlerts(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <GlassBox>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <WarningIcon color="warning" />
        <Typography variant="h6">Weather Alerts</Typography>
      </Box>

      {alerts.alert.map((alert, index) => (
        <AlertBox key={index} severity={alert.severity}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                {alert.event}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Effective: {new Date(alert.effective).toLocaleString()}
              </Typography>
              <Collapse in={expandedAlerts[index]}>
                <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
                  {alert.desc}
                </Typography>
                {alert.instruction && (
                  <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
                    Instructions:
                    <Typography component="div" variant="body2" sx={{ mt: 0.5, fontWeight: 'normal' }}>
                      {alert.instruction}
                    </Typography>
                  </Typography>
                )}
              </Collapse>
            </Box>
            <IconButton 
              onClick={() => toggleAlert(index)}
              size="small"
              sx={{ mt: -0.5 }}
            >
              {expandedAlerts[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>
        </AlertBox>
      ))}
    </GlassBox>
  );
};

WeatherAlerts.propTypes = {
  alerts: PropTypes.shape({
    alert: PropTypes.arrayOf(PropTypes.shape({
      event: PropTypes.string.isRequired,
      effective: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      instruction: PropTypes.string,
      severity: PropTypes.string,
    })),
  }),
};

WeatherAlerts.defaultProps = {
  alerts: {
    alert: [],
  },
};

export default WeatherAlerts;
