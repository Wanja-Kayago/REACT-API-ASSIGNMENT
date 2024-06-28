import React, { useState, useEffect } from 'react';

async function fetchWeatherData(city, apiKey) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null; 
  }
}

export default function Weather() {
  const [city, setCity] = useState('Kisumu'); 
  const [weather, setWeather] = useState();
  const apiKey = '70c8496c1f50491ca1b151454242706'; 

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeatherData(city, apiKey);
      setWeather(data);
    };

    fetchData();
  }, [city, apiKey]);

  if (!weather) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <h2>Region:{weather.location.region}</h2>
      <h2>Country: {weather.location.country}</h2>
      <p></p>
      <p>Temperature: {(weather.current.temp_c).toFixed(2)}°C</p>
      <p>Condition: {weather.current.condition.text}</p>
      <p>Local time: {weather.location.localtime}</p>
      <p>Precipitation:{weather.current.precip_in}</p>
      <p>Humidity:{weather.current.humidity}</p>
      <p>Wind:{weather.current.wind_mph}</p>
    </div>
  );
}
