import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from './navigationService';


const storeTokens = async (accessToken, refreshToken) => {
  try {

    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);

    console.log('Tokens stored successfully:');
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);
  } catch (error) {
    console.error('Error storing tokens', error);
  }
};

const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem('accessToken');
  } catch (error) {
    console.error('Error getting access token', error);
  }
  return null;
};

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

const refreshAccessToken = async () => {
  try {
    const refreshToken = await getRefreshToken(); // Await the retrieval of the refresh token
    if (!refreshToken) {
      // No refresh token, send user to login
      console.log('No refresh token found, navigating to login.');
      navigate('Login');
      return;
    }

    console.log('Sending refresh token to the server...');
    console.log('Request body:', JSON.stringify({ token: refreshToken }));

    const response = await fetch('http://localhost:8085/user/refreshToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: refreshToken // Send the refresh token in the body
      }),
    });

    console.log('Response Status:', response.status);
    
    // Use response.json() to parse response only if response is OK
    const data = response.ok ? await response.json() : null;

    if (!response.ok || !data) {
      // Invalid refresh token or no data returned, send user to login
      console.log('Response not OK or no data, token invalid, navigating to login.');
      const errorMessage = response.statusText || 'Unknown error occurred';
      console.error('Error message:', errorMessage);
      await removeTokens(); // Clear invalid tokens
      navigate('Login');
      return;
    }

    console.log('Access token refreshed successfully:', data);
    const { accessToken, refreshToken: newRefreshToken, userType } = data; // Rename to avoid shadowing

    // Log new tokens for debugging
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', newRefreshToken);
    console.log('User Type:', userType);

    // Store new access token and navigate to home
    await storeTokens(accessToken, newRefreshToken);
    console.log('New tokens stored. Navigating to home...');

    if (userType === "Student") {
      navigate('StudentHome', { token: accessToken, usertype: userType });
    } else {
      navigate('OfficerHome', { token: accessToken, usertype: userType });
    }

  } catch (error) {
    console.error('Failed to refresh access token', error);
    await removeTokens(); // Clear tokens on error
    navigate('Login');
  }
};

  
  export { storeTokens, getAccessToken, getRefreshToken, removeTokens, refreshAccessToken };
