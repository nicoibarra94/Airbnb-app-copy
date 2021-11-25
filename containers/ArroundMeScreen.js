import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

export default function ArroundMeScreen() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const askPermissionAndGetData = async () => {
      let permissionResponse =
        await Location.requestForegroundPermissionsAsync();

      if (permissionResponse.status === "granted") {
        let location = await Location.getCurrentPositionAsync({});

        const obj = {
          latitude: 48.869328685226336,
          longitude: 2.3611898961760387,
          //   latitude: location.coords.latitude,
          //   longitude: location.coords.longitude,
        };

        try {
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${obj.latitude}&longitude=${obj.longitude}`
          );
          setData(response.data);
        } catch (error) {
          console.log(error.message);
        }
        setCoords(obj);
      } else {
        setError(true);
      }
      setIsLoading(false);
    };

    askPermissionAndGetData();
  }, []);

  return isLoading === true ? (
    <ActivityIndicator
      size="large"
      color="#f9bbbe"
      style={{ marginTop: 400 }}
    />
  ) : (
    <MapView
      style={styles.container}
      initialRegion={{
        longitude: coords.longitude,
        latitude: coords.latitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      showsUserLocation={true}
    >
      {data.map((marker, index) => {
        return (
          <MapView.Marker
            key={index}
            coordinate={{
              latitude: marker.location[1],
              longitude: marker.location[0],
            }}
            title={marker.title}
          ></MapView.Marker>
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
