import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export const getCurrentWeather = async (location) => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json?q=${location}&key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const getHistoryWeather = async (location, date) => {
  try {
    const response = await axios.get(`${BASE_URL}/history.json?q=${location}&dt=${date}&key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching history weather:', error);
    throw error;
  }
};

export const getForecastWeather = async (location) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json?q=${location}&days=3&key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast weather:', error);
    throw error;
  }
};
