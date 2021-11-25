import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/Airbnb-Embleme.jpeg")}
              resizeMode="contain"
            />
            <Text style={styles.signIn}>Sign In</Text>
          </View>

          <View>
            <TextInput
              style={styles.input}
              placeholder="email"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="password"
              secureTextEntry={hidePass ? false : true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            {hidePass === false ? (
              <Entypo
                style={styles.icon}
                name="eye-with-line"
                onPress={() => setHidePass(!hidePass)}
              />
            ) : (
              <Entypo
                style={styles.icon}
                name="eye"
                onPress={() => setHidePass(!hidePass)}
              />
            )}
            <View style={styles.bottom}>
              <TouchableOpacity
                style={styles.signInButton}
                title="Sign in"
                onPress={async () => {
                  try {
                    if (email && password) {
                    } else {
                      return alert("Please enter your email and your password");
                    }

                    setIsLoading(true);

                    {
                      isLoading === true && (
                        <ActivityIndicator
                          size="large"
                          color="#FF585D"
                          style={{ marginTop: 100 }}
                        />
                      );
                    }

                    const response = await axios.post(
                      "https://express-airbnb-api.herokuapp.com/user/log_in",
                      {
                        email: email,
                        password: password,
                      }
                    );
                    const userToken = response.data.token;
                    setToken(userToken);
                  } catch (error) {
                    alert("Please enter a valid email and password");
                  }
                }}
              >
                <Text style={styles.textButton}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                <Text style={styles.greyText}>
                  You don't have an account yet? Register here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 190,
    height: 200,
    marginTop: 50,
  },
  container: {
    backgroundColor: "white",
    height: 900,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 120,
  },
  signIn: {
    fontSize: 25,
    fontWeight: "400",
    color: "#878787",
  },
  input: {
    borderBottomColor: "#f9bbbe",
    borderBottomWidth: 2,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 50,
  },
  icon: {
    fontSize: 24,
    color: "#878787",
    position: "absolute",
    right: 50,
    top: 55,
  },
  bottom: {
    alignItems: "center",
    marginTop: 140,
  },
  signInButton: {
    width: 180,
    height: 60,
    marginBottom: 10,
    borderColor: "#FF585D",
    borderWidth: 3,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  textButton: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#878787",
  },
  greyText: {
    color: "#878787",
  },
});
