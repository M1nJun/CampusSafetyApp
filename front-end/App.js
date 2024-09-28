import React, { useEffect, useRef, useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from './services/navigationService';  // Import the reference
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
import ProfileViewScreen from "./screens/ProfileViewScreen";
import * as TokenService from './services/tokenService';
import { AppState } from 'react-native';


export default function App() {
  const Stack = createNativeStackNavigator();
  const appState = useRef(AppState.currentState); // Reference to store the current app state

  useEffect(() => {
    // Function to handle app state change
    const handleAppStateChange = (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground, refreshing access token...');
        TokenService.refreshAccessToken(); // Refresh token when app comes to foreground
      }
      appState.current = nextAppState; // Update the current app state
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove(); // Cleanup the event listener on component unmount
    };
  }, []);

  useEffect(() => {
    // Check for refresh token on app load
    TokenService.refreshAccessToken();
  }, []);
  

  return (
    <NavigationContainer ref={navigationRef}>
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
        <Stack.Screen
          name="ProfileView"
          component={ProfileViewScreen}
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
