import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import MapView from "react-native-maps";
import axios from "axios";

export default function ProfileScreen() {
  const { params } = useRoute();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${params.id}`
        );
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const displayStars = (rating) => {
    const tab = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        tab.push(<Entypo name="star" size={22} color="#FFB30B" key={i} />);
      } else {
        tab.push(<Entypo name="star" size={22} color="#a3a3a3" key={i} />);
      }
    }
    return tab;
  };

  return isLoading === true ? (
    <ActivityIndicator
      size="large"
      color="#f9bbbe"
      style={{ marginTop: 400 }}
    />
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View>
            <SwiperFlatList
              autplay
              autoplayDelay={5}
              autoplayLoop
              index={0}
              data={data.photos}
              keyExtractor={(item) => String(item.picture_id)}
              renderItem={({ item }) => (
                <View style={styles.containerImage}>
                  <Image style={styles.imageOffer} source={item} />
                </View>
              )}
            />
            <View style={styles.containerPrice}>
              <Text style={styles.textPrice}>{data.price}€</Text>
            </View>
            <View style={styles.containerInfo}>
              <View style={styles.profileContainer}>
                <Text style={styles.offerTitle} numberOfLines={1}>
                  {data.title}
                </Text>
                <Image
                  style={styles.profilePhoto}
                  source={data.user.account.photo}
                />
              </View>
              <View style={styles.reviewsContainer}>
                {displayStars(data.ratingValue)}
                <Text style={styles.review}>{data.reviews} reviews </Text>
              </View>
              <Text style={styles.description} numberOfLines={3}>
                {data.description}{" "}
              </Text>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: data.location[1],
                  longitude: data.location[0],
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <MapView.Marker
                  coordinate={{
                    latitude: data.location[1],
                    longitude: data.location[0],
                  }}
                />
              </MapView>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white" },
  logo: { width: 80, height: 80 },
  logoContainer: { alignItems: "center" },
  imageOffer: { width: 428, height: 350, resizeMode: "contain" },
  containerPrice: {
    position: "absolute",
    backgroundColor: "black",
    height: 30,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    top: 275,
  },
  containerInfo: {
    position: "absolute",
    top: 330,
    marginLeft: 17,
    marginRight: 17,
  },
  textPrice: { color: "white", fontSize: 17 },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profilePhoto: {
    width: 63,
    height: 63,
    borderRadius: 50,
    resizeMode: "contain",
  },
  offerTitle: {
    width: 300,
    fontSize: 18,
    fontWeight: "500",
    marginTop: 8,
  },
  reviewsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  review: { fontSize: 12, color: "#8e8e8e", marginLeft: 5 },
  description: { lineHeight: 22 },
  map: { width: "100%", height: 230, marginTop: 20 },
});
