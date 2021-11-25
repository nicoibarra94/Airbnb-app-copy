import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePass, setHidePass] = useState(false);

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.containerLogo}>
            <Image
              style={styles.logo}
              source={require("../assets/Airbnb-Embleme.jpeg")}
              resizeMode="contain"
            />
            <Text style={styles.signUpTitle}>Sign Up</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                setEmail(text);
              }}
              placeholder="Email"
            />

            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                setUsername(text);
              }}
              placeholder="Username"
            />

            <TextInput
              style={styles.description}
              multiline={true}
              onChangeText={(text) => {
                setDescription(text);
              }}
              placeholder="Describe yourself in a few words..."
            />

            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                setPassword(text);
              }}
              placeholder="Password"
              secureTextEntry={hidePass ? false : true}
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

            <TextInput
              style={styles.input}
              secureTextEntry={hidePass ? false : true}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
              placeholder="Confirm Password"
            />

            <View style={styles.bottom}>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={async () => {
                  try {
                    if (email && username && description && password) {
                    } else {
                      return alert("Please fill all fields");
                    }

                    if (password !== confirmPassword) {
                      return alert("Both passwords needs to be the same");
                    }
                    const response = await axios.post(
                      "https://express-airbnb-api.herokuapp.com/user/sign_up",
                      {
                        email: email,
                        username: username,
                        description: description,
                        password: password,
                      }
                    );
                    const userToken = response.data.token;
                    setToken(userToken);
                    alert("Welcome!");
                  } catch (error) {
                    console.log(error.message);
                    alert(error.response.data.error);
                  }
                }}
              >
                <Text style={styles.textButton}>Sing Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignIn");
                }}
              >
                <Text style={styles.greyText}>
                  Already have an account? Sign in !
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
    width: 180,
    height: 150,
  },
  container: {
    backgroundColor: "white",
    height: 900,
  },
  containerLogo: {
    alignItems: "center",
    marginBottom: 50,
  },
  signUpTitle: {
    fontSize: 25,
    color: "#878787",
    marginTop: 10,
  },

  input: {
    borderBottomColor: "#f9bbbe",
    borderBottomWidth: 2,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 50,
  },
  description: {
    borderBottomColor: "#f9bbbe",
    borderLeftColor: "#f9bbbe",
    borderRightColor: "#f9bbbe",
    borderTopColor: "#f9bbbe",
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 50,
    height: 120,
    borderRadius: 4,
  },
  bottom: {
    alignItems: "center",
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
    fontSize: 17,
    fontWeight: "bold",
    color: "#878787",
  },
  greyText: {
    color: "#878787",
  },
  icon: {
    fontSize: 24,
    color: "#878787",
    position: "absolute",
    right: 50,
    top: 295,
  },
});
