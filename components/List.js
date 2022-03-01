import {
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";

import { useState, useEffect } from "react";
import Weather from "./Weather";

export default function List() {
  const [dataWeather, setDataWeather] = useState([]);
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState("none");
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((res) => setCountries(res))
      .catch((err) => console.log(`error : ${err}`));
  }, []);

  useEffect(() => {
    if (weather !== "none") {
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${weather}&limit=5&appid=ca1dd64b9fae08811d95e154d46897da`
      )
        .then((res) => res.json())
        .then((res) =>
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${res[0].lat}&lon=${res[0].lon}&appid=ca1dd64b9fae08811d95e154d46897da`
          )
        )
        .then((res) => res.json())
        .then((res) => setDataWeather(res))
        .catch((err) => console.log(err));
    }
  }, [weather]);

  const currentWeather = (param) => {
    return dataWeather.length > 0 ? (
      dataWeather.name === param ? (
        <>
          <Text>Weather :</Text>
          <Text> Humidity : {dataWeather.main.humidity}%</Text>
          <Text>
            Temperature : {Math.floor(dataWeather.main.temp - 273.5)}°C
          </Text>{" "}
        </>
      ) : null
    ) : null;
  };

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
            <Weather info={data.item.capital} current={dataWeather} />
            <TouchableOpacity
              onPress={() => {
                return setWeather(data.item.capital[0]);
              }}
            >
              <Text>Helllo</Text>
            </TouchableOpacity>
            {() => currentWeather(data.item.capital)}
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
