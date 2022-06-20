import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/Home";
import BagScreen from "./screens/Bag";
import AuthScreen from "./screens/Auth";
import SplashScreen from "./screens/Splash";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerBackTitleVisible: false }}
          />
          <Stack.Screen
            name="Login"
            component={AuthScreen}
            options={{ headerBackTitleVisible: false }}
          />
          <Stack.Screen
            name="Break a Legg"
            component={HomeScreen}
            options={{ headerBackTitleVisible: false }}
          />
          <Stack.Screen
            name="Bag"
            component={BagScreen}
            options={{ headerBackTitleVisible: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
