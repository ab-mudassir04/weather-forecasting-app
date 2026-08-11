# 🌤️ WeatherNow – Smart Weather Forecasting Application

<p align="center">
  <strong>A modern, responsive weather forecasting application built with React.js and OpenWeather API.</strong>
</p>

<p align="center">
  Search worldwide cities, Indian PIN codes, use your current location, check real-time weather, hourly forecasts, and 5-day forecasts.
</p>

---

## 🌐 Live Demo

🔗 **Live Website:**
https://your-weather-app.netlify.app

🔗 **GitHub Repository:**
https://github.com/ab-mudassir04/weather-forecasting-app

> Replace the Netlify URL above with your actual deployed website URL after deployment.

---

## 📌 Project Overview

**WeatherNow** is a responsive weather forecasting web application developed as a **Final Year Project**.

The application allows users to search for weather information using:

- 🌍 City name
- 📮 Indian PIN code
- 📍 Current device location
- ⭐ Favorite cities
- 🕘 Recently searched cities

Users can view real-time weather information, weather highlights, hourly forecasts, and a 5-day weather forecast.

The application is designed with a clean, modern, and responsive interface that works across desktop, tablet, and mobile devices.

---

## ✨ Features

### 🔍 Smart Location Search

Search for locations using:

- City name
- Worldwide city search
- Indian 6-digit PIN code
- Search suggestions
- Debounced search
- Location selection

Example:

```text
Nanded
Mumbai
Hyderabad
431601
400001
500001
```

---

### 📍 Current Location

Users can click:

**Use My Current Location**

The application uses the browser's Geolocation API to detect the user's latitude and longitude and display weather information for their current location.

---

### 🌡️ Current Weather

Displays:

- Current temperature
- Weather condition
- Weather icon
- Feels-like temperature
- Sunrise
- Sunset
- Location
- Country

Example:

```text
📍 Nanded, IN

☀️ 28°C

Clear Sky

Feels like 30°C

🌅 Sunrise     06:02 AM
🌇 Sunset      06:58 PM
```

---

### 📊 Weather Highlights

Provides additional weather information such as:

- 💧 Humidity
- 💨 Wind speed
- 🌡️ Pressure
- 👁️ Visibility
- 🌞 UV information
- ☁️ Cloud percentage

---

### 🕐 Hourly Forecast

Users can view upcoming hourly weather information including:

- Time
- Weather icon
- Temperature
- Weather condition

---

### 📅 5-Day Forecast

Displays a multi-day forecast with:

- Date
- Weather icon
- Maximum temperature
- Minimum temperature
- Weather condition

---

### ⭐ Favorite Cities

Users can add frequently visited locations to favorites.

Favorites are stored in the browser using:

```text
localStorage
```

Users can quickly select a saved city without searching again.

---

### 🕘 Recent Cities

The application automatically stores recently searched locations.

Users can:

- Open recent locations
- Quickly check weather again
- Clear recent searches

---

### 🌡️ Celsius / Fahrenheit

Users can switch between:

```text
°C Celsius
°F Fahrenheit
```

The weather data is automatically reloaded using the selected unit.

---

### 🌙 Dark / Light Mode

The application supports:

- 🌙 Dark Mode
- ☀️ Light Mode

---

### 📱 Fully Responsive

WeatherNow is designed for:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📲 Tablet

The interface automatically adapts to different screen sizes.

---

## 🛠️ Technologies Used

### Frontend

| Technology | Purpose                       |
| ---------- | ----------------------------- |
| HTML5      | Application structure         |
| CSS3       | Styling and responsive design |
| JavaScript | Application logic             |
| React.js   | UI development                |
| Vite       | Development and build tool    |

### APIs

| API                       | Purpose                         |
| ------------------------- | ------------------------------- |
| OpenWeather API           | Weather and forecast data       |
| OpenWeather Geocoding API | City coordinates                |
| India Post PIN Code API   | Indian PIN code location search |
| Browser Geolocation API   | Current location                |

### Development Tools

```text
Visual Studio Code
Git
GitHub
Netlify
npm
Chrome DevTools
```

---

## 📂 Project Structure

```text
weather-forecasting-app/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── CurrentWeather.jsx
│   │   ├── WeatherHighlights.jsx
│   │   ├── HourlyForecast.jsx
│   │   ├── Forecast.jsx
│   │   ├── RecentCities.jsx
│   │   ├── FavoriteCities.jsx
│   │   ├── Loading.jsx
│   │   └── ErrorMessage.jsx
│   │
│   ├── services/
│   │   └── weatherService.js
│   │
│   ├── utils/
│   │   └── storageUtils.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/ab-mudassir04/weather-forecasting-app.git
```

### 2. Navigate to the project

```bash
cd weather-forecasting-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create environment file

Create a file named:

```text
.env
```

in the project root.

Add:

```env
VITE_WEATHER_API_KEY=your_openweather_api_key
```

### 5. Start the development server

```bash
npm run dev
```

The application will run at:

```text
http://localhost:5173
```

---

## 🔑 API Configuration

This project uses the **OpenWeather API**.

Create an account at:

🔗 https://openweathermap.org/

Generate an API key and add it to:

```text
.env
```

Example:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

The application reads the API key using:

```javascript
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
```

### ⚠️ Security

Do not commit your `.env` file to GitHub.

The `.gitignore` file already contains:

```text
.env
.env.*
```

---

## 📮 PIN Code Search

WeatherNow also supports Indian PIN code searches.

Example:

```text
431601
```

The application uses the India Post PIN Code API to identify the corresponding postal location and then uses location coordinates to retrieve weather information.

Flow:

```text
Indian PIN Code
       ↓
India Post API
       ↓
District / State
       ↓
OpenWeather Geocoding
       ↓
Latitude / Longitude
       ↓
Weather API
       ↓
Weather Information
```

---

## 📍 Current Location Flow

```text
User clicks
"Use My Current Location"
        ↓
Browser Geolocation API
        ↓
Latitude + Longitude
        ↓
OpenWeather API
        ↓
Current Weather
```

---

## 🧠 Application Workflow

```text
                 WeatherNow
                     │
              Smart Search
                     │
        ┌────────────┼────────────┐
        │            │            │
      City        PIN Code    GPS Location
        │            │            │
        └────────────┼────────────┘
                     ↓
             Location Coordinates
                     ↓
             OpenWeather API
                     ↓
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
   Current        Hourly         5-Day
   Weather       Forecast       Forecast
       │             │             │
       └─────────────┼─────────────┘
                     ↓
              Weather Dashboard
                     │
          ┌──────────┴──────────┐
          ↓                     ↓
      Favorites            Recent Cities
```

---

## 🧪 Production Build

To create a production build:

```bash
npm run build
```

The production files are generated inside:

```text
dist/
```

To preview the production build:

```bash
npm run preview
```

---

## 🚀 Deployment

WeatherNow can be deployed using **Netlify**.

### Build command

```text
npm run build
```

### Publish directory

```text
dist
```

### Environment variable

Add the following in Netlify:

```text
VITE_WEATHER_API_KEY
```

Set its value to your OpenWeather API key.

---

## 🔄 GitHub Workflow

After making changes:

```bash
git add .
```

```bash
git commit -m "Update WeatherNow features"
```

```bash
git push
```

Netlify can automatically deploy the latest GitHub version.

---

## 📸 Screenshots

Add screenshots of your application here after completing the UI.

### Home Page

```text
Add your screenshot here
```

### Weather Dashboard

```text
Add your screenshot here
```

### Mobile View

```text
Add your screenshot here
```

---

## 🎓 Academic Project

**Project Type:** Final Year Project

**Project Title:**
**WeatherNow – Smart Weather Forecasting Application**

**Frontend Technologies:**

```text
HTML5
CSS3
JavaScript
React.js
```

**APIs:**

```text
OpenWeather API
India Post PIN Code API
Browser Geolocation API
```

---

## 🔮 Future Enhancements

Possible future improvements include:

- 🤖 AI-powered weather assistant
- 🌧️ Rain prediction
- ⚠️ Severe weather alerts
- 📈 Weather charts
- 🌍 Interactive weather map
- 🗺️ Map-based location selection
- 🔔 Weather notifications
- 🌅 Sunrise/sunset visualization
- 📊 Historical weather data
- 🗣️ Voice-based weather search
- 🌐 Multi-language support
- 📱 Progressive Web App (PWA)

---

## 👨‍💻 Developer

**Abdul Mudassir**

B.Sc. Computer Science
Java Full Stack Developer

### Technologies

```text
Java
Spring Boot
React.js
JavaScript
HTML
CSS
MySQL
Git
GitHub
REST APIs
```

---

## 📄 License

This project was developed for educational and academic purposes.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

<p align="center">
  🌤️ <strong>WeatherNow</strong> — Weather for Every City
</p>
