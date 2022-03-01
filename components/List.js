import {
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";

import { useState, useEffect } from "react";

export default function () {
  const handlePress = (capital) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=5&appid=ca1dd64b9fae08811d95e154d46897da`
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
  };

  const [weather, setWeather] = useState();

  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((res) => setCountries(res))
      .catch((err) => console.log(`error : ${err}`));
  }, []);
  //TODO
  const Renderweather = () => {
    return weather ? (
      <>
        <Text> Humidity : {weather.main.humidity}%</Text>
        <Text>Temperature : {Math.floor(weather.main.temp - 273.5)}°C</Text>
      </>
    ) : (
      <Text>Hello</Text>
      // <ActivityIndicator size="large" color="red" />
    );
  };
  //* Fin de TODO
  return countries.length > 0 ? (
    <>
      <FlatList
        data={countries}
        renderItem={(data) => (
          <>
            <Image
              source={{ uri: `${data.item.flags.png}` }}
              style={styles.img}
            ></Image>
            <Text
              style={styles.list}
            >{`${data.item.name.common} // Capital : ${data.item.capital}`}</Text>
            {/*Partie à reprendre */}
            <Text onPress={() => console.log(weather)}>Click </Text>
            <Text onPress={() => handlePress(data.item.capital)}>
              Weather :{" "}
            </Text>

            {Renderweather()}
            {/*Partie à reprendre */}
          </>
        )}
        keyExtractor={(_data, index) => index.toString()}
      />
    </>
  ) : (
    <>
      <ActivityIndicator size="large" color="red" />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  list: {
    fontSize: 20,
  },
  img: {
    height: 120,
    width: 200,
  },
});
