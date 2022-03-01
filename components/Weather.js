import { useEffect, useState } from "react";

export default function Weather(props) {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    if (props.current !== "" && props.info === props.current)
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${props.current}&limit=5&appid=ca1dd64b9fae08811d95e154d46897da`
      )
        .then((res) => res.json())
        .then((res) =>
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${res[0].lat}&lon=${res[0].lon}&appid=ca1dd64b9fae08811d95e154d46897da`
          )
        )
        .then((res) => res.json())
        .then((res) => setWeather(res))
        .catch((err) => console.log(err));
  }, [props.current]);

  return weather.length > 0 ? (
    <>
      <Text>Weather :</Text>
      <Text> Humidity : {weather.main.humidity}%</Text>
      <Text>Temperature : {Math.floor(weather.main.temp - 273.5)}°C</Text>{" "}
    </>
  ) : null;
}
