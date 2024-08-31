import { theme } from "./colors";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import StudentHomeScreen from "./screens/StudentHomeScreen";
import VerificationScreen from "./screens/VerificationScreen";
import StudentAccountScreen from "./screens/StudentAccountScreen";
import OfficerAccountScreen from "./screens/OfficerAccountScreen";
import RequestViewScreen from "./screens/RequestViewScreen";
import OfficerHomeScreen from "./screens/OfficerHomeScreen";
import OfficerRequestLockScreen from "./screens/OfficerRequestLockScreen";
import StudentRequestLockScreen from "./screens/StudentRequestLockScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="StudentHome" component={StudentHomeScreen} />
        <Stack.Screen name="OfficerHome" component={OfficerHomeScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="StudentAccount" component={StudentAccountScreen} />
        <Stack.Screen name="OfficerAccount" component={OfficerAccountScreen} />
        <Stack.Screen
          name="OfficerRequestLock"
          component={OfficerRequestLockScreen}
        />
        <Stack.Screen
          name="StudentRequestLock"
          component={StudentRequestLockScreen}
        />
        <Stack.Screen
          name="RequestView"
          component={RequestViewScreen}
          options={{
            headerShown: true,
            headerTitle: "",
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: "black",
            },
            headerTintColor: "white",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
