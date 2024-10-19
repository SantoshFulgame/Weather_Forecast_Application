const dotenv = require("dotenv").config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const City = require('./DB'); // Import the City model
const app = express();

app.use(cors());
app.use(express.json()); // To parse JSON bodies

const username = encodeURIComponent(process.env.MONGODB_USERNAME);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const dbName = process.env.MONGODB_DATABASE; // Use your environment variable
const PORT = process.env.PORT || 8080;

const WEATHER_API_KEY = process.env.WEATHER_API_KEY; // Use an environment variable for the API key

// Weather endpoint
app.get('/api/weather', async (req, res) => {
  const { city, lat, lon } = req.query;

  try {
    let weatherResponse;

    if (city) {
      weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
    } else if (lat && lon) {
      weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    } else {
      return res.status(400).json({ error: "City or coordinates required" });
    }

    const forecastResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city || weatherResponse.data.name}&appid=${WEATHER_API_KEY}&units=metric`);

    const currentWeather = {
      cityName: weatherResponse.data.name,
      temperature: weatherResponse.data.main.temp,
      windSpeed: weatherResponse.data.wind.speed,
      humidity: weatherResponse.data.main.humidity,
      icon: weatherResponse.data.weather[0].icon,
      description: weatherResponse.data.weather[0].description
    };

    const forecast = forecastResponse.data.list.slice(0, 4).map(forecastItem => ({
      day: new Date(forecastItem.dt_txt).toLocaleDateString(),
      temperature: forecastItem.main.temp,
      windSpeed: forecastItem.wind.speed,
      humidity: forecastItem.main.humidity,
      icon: forecastItem.weather[0].icon
    }));

    // Send the weather and forecast data as a response
    res.json({ currentWeather, forecast });

    // Attempt to save the city after sending the response
    const existingCity = await City.findOne({ name: weatherResponse.data.name });
    if (!existingCity) {
      const cityEntry = new City({ name: weatherResponse.data.name });
      await cityEntry.save();
    }
    
  } catch (error) {
    console.error('Error fetching weather data:', error.message); // Improved error logging
    return res.status(500).json({ error: 'Internal Server Error' }); // Return after sending the error response
  }
});


app.post('/api/cities', async (req, res) => {
  const { name } = req.body;

  try {
    // Check if the city already exists in the database (case-insensitive)
    const existingCity = await City.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });

    if (existingCity) {
      return res.status(400).json({ message: "City already exists in the database." });
    }

    // Create and save the new city
    const newCity = new City({ name });
    await newCity.save();

    res.status(201).json(newCity);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// Get the list of tracked cities
app.get('/api/cities', async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Remove a city from tracking
app.delete('/api/cities/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await City.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting city:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// MongoDB connection URI
const MONGODB_URI = `mongodb://localhost:27017/weatherForecast`;

// Function to connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI); // Removed useNewUrlParser and useUnifiedTopology
    console.log("Connected to Database");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit the process with a failure code
  }
};

// Start MongoDB connection and server
const startServer = async () => {
  await connectToDatabase();
  app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
};

// Start the server
startServer();
