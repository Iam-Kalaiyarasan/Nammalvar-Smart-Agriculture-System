import { useState } from "react";
import axios from "axios";

function Weather() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {

    try {

      const apiKey = "069c1668c631e04bafef72f6f724ae7c";

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      setWeather(response.data);

    } catch (error) {
      alert("City not found");
    }
  };

  return (
    <div>

      <h2>Weather Information</h2>

      <input
        type="text"
        placeholder="Enter City"
        onChange={(e)=>setCity(e.target.value)}
      />

      <button onClick={getWeather}>
        Get Weather
      </button>

      {weather && (

        <div>

          <h3>{weather.name}</h3>

          <p>
            Temperature:
            {weather.main.temp} °C
          </p>

          <p>
            Humidity:
            {weather.main.humidity} %
          </p>

          <p>
            Weather:
            {weather.weather[0].main}
          </p>

          <p>
            Wind:
            {weather.wind.speed} m/s
          </p>

        </div>

      )}

    </div>
  );
}

export default Weather;