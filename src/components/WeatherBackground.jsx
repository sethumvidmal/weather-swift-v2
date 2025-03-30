import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/WeatherAnimations.css';
import { useTheme } from '../hooks/useTheme';

const WeatherBackground = ({ weatherCondition }) => {
  const { darkMode } = useTheme();
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements = [];
      const condition = weatherCondition?.toLowerCase() || 'cloudy';
      
      switch(condition) {
        case 'clear':
        case 'sunny':
          for (let i = 0; i < 3; i++) {
            newElements.push({
              type: 'sun',
              style: {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${Math.random() * 2}s`
              }
            });
          }
          break;
          
        case 'cloudy':
        case 'partly cloudy':
          for (let i = 0; i < 5; i++) {
            newElements.push({
              type: 'cloud',
              style: {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${Math.random() * 5}s`
              }
            });
          }
          break;
          
        case 'rain':
        case 'light rain':
        case 'moderate rain':
          for (let i = 0; i < 50; i++) {
            newElements.push({
              type: 'rain-drop',
              style: {
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }
            });
          }
          break;
          
        default:
          // Default cloudy weather
          for (let i = 0; i < 3; i++) {
            newElements.push({
              type: 'cloud',
              style: {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${Math.random() * 5}s`
              }
            });
          }
      }
      
      setElements(newElements);
    };

    generateElements();
  }, [weatherCondition]);

  return (
    <div className={`weather-background ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      {elements.map((element, index) => (
        <div
          key={index}
          className={element.type}
          style={element.style}
        />
      ))}
    </div>
  );
};

WeatherBackground.propTypes = {
  weatherCondition: PropTypes.string,
};

WeatherBackground.defaultProps = {
  weatherCondition: 'cloudy',
};

export default WeatherBackground;
