import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaTrash } from "react-icons/fa"; // Importing Font Awesome trash icon
import "react-toastify/dist/ReactToastify.css";
import './App.css';

axios.defaults.baseURL = "http://localhost:8080/";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sampleCities, setSampleCities] = useState([]);
  const [error, setError] = useState(null);

  const fetchSampleCities = async () => {
    try {
      const response = await axios.get("/api/cities");
      setSampleCities(response.data);
    } catch (error) {
      toast.error("Failed to fetch previously searched cities.");
    }
  };

  useEffect(() => {
    fetchSampleCities();
  }, []);

  const handleSearch = async () => {
    if (!city) {
      toast.warn("Please enter a city name");
      return;
    }
  
    // Convert both city input and stored city names to lowercase for a case-insensitive comparison
    const cityExists = sampleCities.some(
      (c) => c.name.toLowerCase() === city.trim().toLowerCase()
    );
  
    if (cityExists) {
      toast.info("City already searched. Fetching weather data...");
    }
  
    setLoading(true);
    setError(null); // Clear any previous error messages
  
    try {
      // If city doesn't exist, add it to the database
      if (!cityExists) {
        await axios.post("/api/cities", { name: city.trim() }); // trim to avoid extra spaces
      }
  
      // Fetch the weather data
      const response = await axios.get(`/api/weather?city=${city}`);
      setWeatherData(response.data.currentWeather);
      setForecastData(response.data.forecast);
      fetchSampleCities(); // Refetch sample cities after search
  
      toast.success("Weather data fetched successfully!");
    } catch (error) {
      toast.error("Failed to fetch weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleClearHistory = () => {
    setWeatherData(null);
    setForecastData([]);
    setCity("");
    setError(null); // Reset error on clearing
    toast.info("History cleared successfully.");
  };

  const handleCityClick = (cityName) => {
    setCity(cityName);
    handleSearch();
  };

  const handleDeleteCity = async (cityId) => {
    try {
      await axios.delete(`/api/cities/${cityId}`);
      fetchSampleCities(); // Refetch cities after deletion
      toast.success("City deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete city. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Weather Dashboard</h1>
      <ToastContainer /> {/* Adding the ToastContainer to display toasts */}
      <div className="container">
        <div className="weather-input">
          <h3>Enter a City Name</h3>
          <input
            type="text"
            className="city-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button
            className="search-btn"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Loading..." : "Search"}
          </button>

          {error && <p className="error">{error}</p>} {/* Display error message */}
          
          <div className="separator"></div>

          <button className="clear-btn" onClick={handleClearHistory}>
            Clear 
          </button>

          <div className="sample-cities">
            <h4>Previously Searched Cities:</h4>
            <div className="city-list">
              {sampleCities.length > 0 ? (
                sampleCities.map((city) => (
                  <div key={city._id} className="city-entry">
                    <button
                      className="city-btn"
                      onClick={() => handleCityClick(city.name)}
                    >
                      {city.name}
                    </button>
                    <FaTrash
                      className="delete-icon"
                      onClick={() => handleDeleteCity(city._id)}
                    />
                  </div>
                ))
              ) : (
                <p>No cities available</p>
              )}
            </div>
          </div>
        </div>

        {weatherData && (
          <div className="weather-data">
            <div className="current-weather">
              <div className="details">
                <h2>{weatherData.cityName}</h2>
                <h4>Temp: {weatherData.temperature.toFixed(2)}°C</h4>
                <h4>Wind: {weatherData.windSpeed.toFixed(2)} M/S</h4>
                <h4>Humidity: {weatherData.humidity}%</h4>
                <div className="icon">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
                    alt="weather-icon"
                  />
                  <h4>{weatherData.description}</h4>
                </div>
              </div>
            </div>
            <div className="days-forecast">
              <h2>4-day Forecast</h2>
              <ul className="weather-cards">
                {forecastData.map((forecast, index) => (
                  <li key={index} className="card">
                    <h4>{forecast.day}</h4>
                    <img
                      src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
                      alt="weather-icon"
                    />
                    <h4>Temp: {forecast.temperature.toFixed(2)}°C</h4>
                    <h4>Wind: {forecast.windSpeed.toFixed(2)} M/S</h4>
                    <h4>Humidity: {forecast.humidity}%</h4>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
