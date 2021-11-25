import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
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
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.offerContainer}
            onPress={() => navigation.navigate("RoomScreen", { id: item._id })}
          >
            <View>
              <Image style={styles.mainImage} source={item.photos[0]} />
              <View style={styles.containerPrice}>
                <Text style={styles.priceText}>{item.price}€</Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View>
                <Text style={styles.offerTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <View style={styles.raitingContainer}>
                  {displayStars(item.ratingValue)}
                  <Text style={styles.review}>{item.reviews} reviews</Text>
                </View>
              </View>
              <Image
                style={styles.profileImage}
                source={item.user.account.photo}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: Dimensions.get("screen").width * 0.95,
    marginLeft: 12.5,
    marginTop: 10,
  },
  offerContainer: {
    marginBottom: 10,
    borderBottomColor: "#c9c7c7",
    borderBottomWidth: 1,
  },
  mainImage: { width: 400, height: 200 },
  containerPrice: {
    position: "absolute",
    backgroundColor: "black",
    height: 30,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    top: 160,
  },
  priceText: { color: "white", fontSize: 17 },
  profileImage: { width: 63, height: 63, borderRadius: 50 },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
    marginTop: 8,
  },
  offerTitle: {
    width: 300,
    fontSize: 18,
    fontWeight: "500",
    marginTop: 8,
  },
  raitingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  review: { fontSize: 12, color: "#8e8e8e", marginLeft: 5 },
});
