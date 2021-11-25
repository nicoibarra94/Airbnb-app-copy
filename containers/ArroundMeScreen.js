import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

export default function ArroundMeScreen() {
  return <MapView style={styles.container}></MapView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
