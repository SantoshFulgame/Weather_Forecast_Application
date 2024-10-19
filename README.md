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

[GitHub Link](https://github.com/SantoshFulgame/Weather_Forecast_Application) — Link to the GitHub of the app.

## Video

Check out the video demonstration of the app:

[![Weather App Demo]([https://github.com/SantoshFulgame/Weather_Forecast_Application/blob/main/frontend/Video/TaskGiven.mp4](https://github.com/SantoshFulgame/Weather_Forecast_Application/blob/main/video_Recording.mp4))]


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
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add your OpenWeatherMap API key:

   ```bash
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```

   You can get the API key by signing up on OpenWeatherMap.

4. Start the development server:

   ```bash
   npm start
   ```

   Open `http://localhost:3000` in your browser to see the app in action.

## Usage

Enter a city name in the search bar to get the current weather and 4-day forecast. The app will display weather information like temperature, humidity, wind speed, etc. The background changes dynamically based on the current weather condition (sunny, rainy, cloudy, etc.).

## API Reference

This app uses the OpenWeatherMap API to fetch weather data. Below are the main API endpoints used:

- Current Weather API: Retrieves the current weather for a location.
- 5 Day / 3 Hour Forecast API: Retrieves the forecast for the next 4 days.

Make sure to sign up on OpenWeatherMap and use your API key in the `.env` file.

## Deployment

You can deploy this app using platforms like:

- Vercel: Continuous deployment directly from GitHub.
- Netlify: Easily deploy your React app with drag-and-drop or continuous integration.
- GitHub Pages: Deploy a React app by pushing the build to a `gh-pages` branch.

To build the project for production:

```bash
npm run build
```

This will create a build folder with all the static files needed to deploy.

## Known Issues

- Background image may not scroll correctly on certain mobile devices (fixed with media queries).
- Weather API data updates every 3 hours, which may cause delays in forecast changes.

## Contributing

Contributions are welcome! Please create an issue or submit a pull request for any changes or improvements.

Fork the repository. Create a new branch:

```bash
git checkout -b feature-branch
```

Commit your changes:

```bash
git commit -am 'Add some feature'
```

Push to the branch:

```bash
git push origin feature-branch
```

Create a new Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries or questions, feel free to contact me:

- GitHub: [SantoshFulgame](https://github.com/SantoshFulgame)
- Email: santoshfulgame71@gmail.com


### Key Improvements:
1. **Code formatting**: The commands and environment variables are properly formatted.
2. **Detailed usage instructions**: Clear steps on how to use the app.
3. **Contributing guidelines**: Well-structured guidelines for contributing.
4. **Contact information**: Proper links to GitHub and email.

This should give users a clear understanding of how to set up, run, and contribute to the project!

