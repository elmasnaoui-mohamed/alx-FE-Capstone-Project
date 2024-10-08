import React, { useState } from "react";
import axios from "axios";
import "./Form.css";
import Weather from "../Weather/Weather";

const Form = () => {
  const [imgURL, setImgURL] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [error, setError] = useState("");

  const getWeather = async (e) => {
    e.preventDefault();
    const cityInput = e.target.elements.city.value;
    const countryInput = e.target.elements.country.value;

    if (cityInput !== "" && countryInput !== "") {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityInput},${countryInput}&units=metric&appid=f0b17076ce4264d3efdc39da00c344bd`
        );
        const url = `https://openweathermap.org/img/w/${response.data.weather[0].icon}.png`;

        setImgURL(url);
        setDescription(response.data.weather[0].description);
        setCity(response.data.name);
        setCountry(response.data.sys.country);
        setTemperature(response.data.main.temp);
        setHumidity(response.data.main.humidity);
        setError("");

        // Clear input fields after fetching
        e.target.elements.city.value = "";
        e.target.elements.country.value = "";
      } catch (error) {
        setError("Country or City name is incorrect!");
        setImgURL("");
        setDescription("");
        setCity("");
        setCountry("");
        setTemperature("");
        setHumidity("");
      }
    } else {
      setError("Please fill the fields!");
      setImgURL("");
      setDescription("");
      setCity("");
      setCountry("");
      setTemperature("");
      setHumidity("");
    }
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={getWeather}>
        <div className="overlay"></div>
        <input
          type="text"
          autoComplete="off"
          placeholder="Enter Country..."
          name="country"
        />
        <input
          type="text"
          autoComplete="off"
          placeholder="Enter City..."
          name="city"
        />
        <button type="submit">Get Weather</button>
        {error && <p className="error">{error}</p>}
        {country && (
          <Weather
            imgURL={imgURL}
            description={description}
            city={city}
            country={country}
            Temperature={temperature}
            Humidity={humidity}
          />
        )}
      </form>
    </div>
  );
};

export default Form;
