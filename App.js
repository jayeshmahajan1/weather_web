import './App.css';
import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

   const API_KEY = "2d121b69423d78374d6669945189c99a";
    const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="app">
    <div className="glass-container">
      <h1 className="title">Weather 3D 🌍</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <h3>{weather.weather[0].main}</h3>

          <div className="temp">
            {Math.round(weather.main.temp)}°C
          </div>

          <div className="details">
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>💨 Wind: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}

export default App;
