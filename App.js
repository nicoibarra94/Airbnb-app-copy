import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import RoomScreen from "./containers/RoomScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import ArroundMeScreen from "./containers/ArroundMeScreen";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="SignIn" options={{ headerShown: false }}>
              {() => <SignInScreen setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" options={{ headerShown: false }}>
              {() => <SignUpScreen setToken={setToken} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator>
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          headerTitle: (props) => (
                            <Image
                              style={{
                                width: 45,
                                height: 35,
                              }}
                              source={require("./assets/Airbnb-Embleme.jpeg")}
                            />
                          ),
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="RoomScreen"
                        options={{
                          headerTitle: (props) => (
                            <Image
                              style={{
                                width: 50,
                                height: 50,
                              }}
                              source={require("./assets/Airbnb-Embleme.jpeg")}
                              resizeMode="contain"
                            />
                          ),
                          headerBackTitleVisible: false,
                        }}
                      >
                        {() => <RoomScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="ArroundMeTab"
                  options={{
                    headerShown: false,
                    tabBarLabel: "Arround me",
                    tabBarIcon: ({ color, size }) => (
                      <Feather name="map-pin" size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Arround Me"
                        options={{
                          headerTitle: (props) => (
                            <Image
                              style={{
                                width: 50,
                                height: 50,
                              }}
                              source={require("./assets/Airbnb-Embleme.jpeg")}
                              resizeMode="contain"
                            />
                          ),
                          headerBackTitleVisible: false,
                        }}
                      >
                        {() => <ArroundMeScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="TabSettings"
                  options={{
                    tabBarLabel: "My Profile",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"ios-options"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{
                          title: "Settings",
                        }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
