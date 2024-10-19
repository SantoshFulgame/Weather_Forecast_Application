# Weather App 🌤️

This is a responsive weather application built using **React** and **OpenWeatherMap API**. It displays the current weather along with a 4-day forecast for any searched location. The app also includes a clean and responsive user interface optimized for mobile, tablet, and desktop devices.

## Features

- 🌍 **Search for any city or location** to get current weather data
- ☀️ **4-day weather forecast** for the selected location
- 📱 **Responsive design** for mobile, tablet, and desktop views
- 🌡️ Displays information like temperature, humidity, wind speed, and more
- 🖼️ Dynamic background images change based on weather conditions (Clear, Cloudy, Rain, etc.)

## Technologies Used

- **React.js** for building the UI
- **OpenWeatherMap API** for fetching weather data
- **CSS/SCSS** for styling and responsive design

## Demo

[Live Demo Link](#) — Link to the live version of the app.

## Getting Started

### Prerequisites

Before you can run the app, you need to have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/SantoshFulgame/weather-app.git
   cd weather-app

2. Install the dependencies:

  ```bash
  npm install
   cd weather-app

3.Create a .env file in the root of the project and add your OpenWeatherMap API key:
  ```makefile
  REACT_APP_WEATHER_API_KEY=your_api_key_here
  You can get the API key by signing up on OpenWeatherMap.

4.Start the development server:

 ```bash
 npm start
 cd weather-app

5. Open http://localhost:3000 in your browser to see the app in action.


### Usage
1.Enter a city name in the search bar to get the current weather and 4-day forecast.
2.The app will display weather information like temperature, humidity, wind speed, etc.
3.he background changes dynamically based on the current weather condition (sunny, rainy, cloudy, etc.).

### API Reference
-This app uses the OpenWeatherMap API to fetch weather data. Below are the main API endpoints used:
1.Current Weather API: Retrieves the current weather for a location.
2.5 Day / 3 Hour Forecast API: Retrieves the forecast for the next 4 days.

Make sure to sign up on OpenWeatherMap and use your API key in the .env file.

### Deployment
To deploy this app, you can use platforms like:

1.Vercel: Continuous deployment directly from GitHub.
2.Netlify: Easily deploy your React app with drag-and-drop or continuous integration.
3.GitHub Pages: Deploy a React app by pushing the build to a gh-pages branch.

To build the project for production:

  ```bash
   npm run build
   cd weather-app

This will create a build folder with all the static files needed to deploy.

### Known Issues
-Background image may not scroll correctly on certain mobile devices (fixed with media queries).
-Weather API data updates every 3 hours, which may cause delays in forecast changes.

### Contributing
-Contributions are welcome! Please create an issue or submit a pull request for any changes or improvements.

1.Fork the repository.
2.Create a new branch (git checkout -b feature-branch).
3.Commit your changes (git commit -am 'Add some feature').
4.Push to the branch (git push origin feature-branch).
5.Create a new Pull Request.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

### Contact
For any inquiries or questions, feel free to contact me:

GitHub: SantoshFulgame
Email: santoshfulgame71@gmail.com
