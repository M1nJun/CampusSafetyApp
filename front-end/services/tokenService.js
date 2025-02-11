import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from './navigationService';
import API_BASE_URL from "../config";

const REFRESH_INTERVAL = 10 * 60 * 1000; 
// Set an initial variable for the timer to hold the reference
let tokenRefreshTimer;

const storeTokens = async (accessToken, refreshToken) => {
  try {

    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);

    // console.log('Tokens stored successfully:');
    // console.log('Access Token:', accessToken);
    // console.log('Refresh Token:', refreshToken);

    // Start a timer to refresh the token after 14 minutes
    scheduleTokenRefresh();

  } catch (error) {
    console.error('Error storing tokens', error);
  }
};

const storeUserType = async (userType) => {
  try {
    await AsyncStorage.setItem('userType', userType);

    // console.log('User Type:', userType);
  } catch (error) {
    console.error('Error storing usertype', error);
  }
}

const scheduleTokenRefresh = async () => {
  // Clear any existing timers (if necessary)
  clearTimeout(tokenRefreshTimer);

  // Schedule the refresh after 14 minutes
  tokenRefreshTimer = setTimeout(async () => {
    console.log("30 seconds passed automatically refreshing token");
    await refreshAccessToken();
  }, REFRESH_INTERVAL);
};

const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem('accessToken');
  } catch (error) {
    console.error('Error getting access token', error);
  }
  return null;
};

const getUserType = async () => {
  try {
    return await AsyncStorage.getItem('userType');
  } catch (error) {
    console.error('Error getting user type', error);
  }
}

const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem('refreshToken');
  } catch (error) {
    console.error('Error getting refresh token', error);
  }
  return null;
};


const removeTokens = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  } catch (error) {
    console.error('Error removing tokens', error);
  }
};

const removeUserType = async () => {
  try {
    await AsyncStorage.removeItem('userType');
  } catch (error) {
    console.error("Error removing usertype", error);
  }
}

const refreshAccessToken = async () => {
  try {
    const refreshToken = await getRefreshToken(); // Await the retrieval of the refresh token
    if (!refreshToken) {
      // No refresh token, send user to login
      console.log('No refresh token found, navigating to login.');
      navigate('Login');
      return false;
    }

    // console.log('Sending refresh token to the server...');

    const response = await fetch(`${API_BASE_URL}/user/refreshToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: refreshToken // Send the refresh token in the body
      }),
    });
    
    // Use response.json() to parse response only if response is OK
    const data = response.ok ? await response.json() : null;

    if (!response.ok || !data) {
      // Invalid refresh token or no data returned, send user to login
      console.log('Response not OK or no data, token invalid, navigating to login.');
      const errorMessage = response.statusText || 'Unknown error occurred';
      console.error('Error message:', errorMessage);
      await removeTokens(); // Clear invalid tokens
      navigate('Login');
      return false;
    }

    // console.log('Access token refreshed successfully:', data);
    const { accessToken, refreshToken: newRefreshToken, userType } = data; // Rename to avoid shadowing

    // Log new tokens for debugging
    // console.log('Access Token:', accessToken);
    // console.log('Refresh Token:', newRefreshToken);
    // console.log('User Type:', userType);

    // Store new access token and navigate to home
    await storeTokens(accessToken, newRefreshToken);
    await storeUserType(userType);
    // console.log('New tokens stored. UserType Stored.');
    return true;


  } catch (error) {
    console.error('Failed to refresh access token', error);
    await removeTokens(); // Clear tokens on error
    navigate('Login');
    return false;
  }
};

  
export { storeTokens, getAccessToken, getRefreshToken, removeTokens, removeUserType, refreshAccessToken, getUserType };
