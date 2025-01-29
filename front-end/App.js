import React, { useEffect, useRef } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from './services/navigationService';  // Import the reference
import { NavigationContainer } from "@react-navigation/native";
import StackNavigatorSetup from './StackNavigatorSetup'; 
import * as TokenService from './services/tokenService';
import { navigate } from './services/navigationService';
import { AppState } from 'react-native';


export default function App() {
  const appState = useRef(AppState.currentState); // Reference to store the current app state

  useEffect(() => {
    // Function to handle app state change
    const handleAppStateChange = async (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground, refreshing access token...');
        const tokenRefreshed = await TokenService.refreshAccessToken(); // Refresh token when app comes to foreground

        const accessToken = await TokenService.getAccessToken();
        const userType = await TokenService.getUserType();

        if (!tokenRefreshed) {
          // If token refresh fails, stop further execution
          console.log('Token refresh failed, user redirected to login.');
          return;
        }

        if (userType === "Student") {
          navigate('StudentHome', { token: accessToken, usertype: userType });
        } else if (userType === "Officer") {
          navigate('OfficerHome', { token: accessToken, usertype: userType });
        }
      }
      appState.current = nextAppState; // Update the current app state
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove(); // Cleanup the event listener on component unmount
    };
  }, []);

  // useEffect(() => {
  //   // Check for refresh token on app load
  //   TokenService.refreshAccessToken();
  // }, []);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Try to refresh the access token on app load
        const tokenRefreshed = await TokenService.refreshAccessToken();

        if (!tokenRefreshed) {
          // If token refresh fails, stop further execution
          console.log('Token refresh failed, user redirected to login.');
          return;
        }
  
        // After refreshing the token, decide which home screen to navigate to based on userType
        const accessToken = await TokenService.getAccessToken();
        const userType = await TokenService.getUserType();
        if (userType === "Student") {
          navigate('StudentHome', { token: accessToken, usertype: userType });
        } else if (userType === "Officer") {
          navigate('OfficerHome', { token: accessToken, usertype: userType });
        }
      } catch (error) {
        // If there's an issue (e.g., token refresh failed), navigate to login
        console.log('Error during initialization:', error);
        navigate('Login');
      }
    };
  
    // Call the initialization logic on app load
    initializeApp();
  }, []);
  

  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigatorSetup />
    </NavigationContainer>
  );
}
