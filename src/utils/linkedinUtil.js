import EncryptedStorage from 'react-native-encrypted-storage';

// Store the tokens along with their expiry times
const storeTokens = async (accessToken, refreshToken, accessExpiresIn, refreshExpiresIn) => {
  try {
    const accessExpiryTime = Date.now() + accessExpiresIn * 1000; // Access token expiry time
    const refreshExpiryTime = Date.now() + refreshExpiresIn * 1000; // Refresh token expiry time

    await EncryptedStorage.setItem('access_token', accessToken);
    await EncryptedStorage.setItem('refresh_token', refreshToken);
    await EncryptedStorage.setItem('access_expiry_time', accessExpiryTime.toString());
    await EncryptedStorage.setItem('refresh_expiry_time', refreshExpiryTime.toString());
  } catch (error) {
    console.error('Error storing tokens:', error);
  }
};

// Get the tokens and their expiry times
const getTokens = async () => {
  try {
    const accessToken = await EncryptedStorage.getItem('access_token');
    const refreshToken = await EncryptedStorage.getItem('refresh_token');
    const accessExpiryTime = await EncryptedStorage.getItem('access_expiry_time');
    const refreshExpiryTime = await EncryptedStorage.getItem('refresh_expiry_time');
    
    if (accessToken && refreshToken && accessExpiryTime && refreshExpiryTime) {
      return {
        accessToken,
        refreshToken,
        accessExpiryTime: parseInt(accessExpiryTime, 10),
        refreshExpiryTime: parseInt(refreshExpiryTime, 10),
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting tokens:', error);
    return null;
  }
};

// Check if access token or refresh token has expired
const isAccessTokenExpired = (accessExpiryTime) => Date.now() >= accessExpiryTime;
const isRefreshTokenExpired = (refreshExpiryTime) => Date.now() >= refreshExpiryTime;

