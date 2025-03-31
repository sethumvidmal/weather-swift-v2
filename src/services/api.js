import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const searchLocations = async (query) => {
  try {
    const response = await api.get("/search.json", {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching locations:", error);
    return [];
  }
};

export const getCurrentWeather = async (location) => {
  try {
    const response = await api.get("/current.json", {
      params: {
        q: location,
        aqi: "yes", // Include air quality data
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
};

export const getForecastWeather = async (location, days = 3) => {
  try {
    const response = await api.get("/forecast.json", {
      params: {
        q: location,
        days,
        aqi: "yes",
        alerts: "yes", // Include weather alerts
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast:", error);
    throw error;
  }
};

export const getAstronomy = async (location, date = "today") => {
  try {
    const response = await api.get("/astronomy.json", {
      params: {
        q: location,
        dt: date,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching astronomy data:", error);
    throw error;
  }
};

export const getHistoryWeather = async (location, date) => {
  try {
    const response = await api.get("/history.json", {
      params: {
        q: location,
        dt: date,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching history weather:", error);
    throw error;
  }
};

export default api;
