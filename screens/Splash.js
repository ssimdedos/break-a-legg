import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";
function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem("@user_email").then((value) =>
        navigation.replace(value === null ? "Login" : "Home")
      );
    }, 1500);
  }, []);
  return (
    <View>
      <Text> Awesome Splash Screen </Text>
    </View>
  );
}

export default SplashScreen;
