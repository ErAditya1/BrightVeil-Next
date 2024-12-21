import axios from 'axios';

export const API_URL = process.env.NODE_ENV === 'production' ? 'https://lms-backend-mh2d.onrender.com/api' : 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    if (typeof window === 'undefined') {
      return config;
    }

    const uniqueId = getUniqueId();
    if (uniqueId) {
      config.headers['X-Unique-ID'] = uniqueId;  // Add the unique ID to the request headers
    }

    const storedUser = localStorage.getItem('BrightVeilUser');
    const user = storedUser ? JSON.parse(storedUser) : null;
    console.log(user);

    // Check for accessToken and if it's expired
    if (user && user.accessToken && isTokenExpired(user.accessTokenExpires)) {
      const newAccessToken = await refreshAccessToken(user.refreshToken);
      if (newAccessToken) {
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      }
    } else if (user && user.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Check if the token is expired
function isTokenExpired(expireTime: number): boolean {
  const currentTime = Date.now();
  return currentTime >= expireTime;
}

// Refresh access token using the refresh token
async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    // Get the device ID (you may use the method you've implemented to retrieve it)
    const uniqueId = getUniqueId();
    if (!uniqueId) {
      console.error('Device ID is missing');
      return null;
    }

    // Send the device ID in the request headers along with the refresh token
    const response = await axios.patch(`${API_URL}/v1/users/refresh-token`, 
      { refreshToken },
      { headers: { 'X-Unique-ID': uniqueId } } // Adding the device ID header here
    );

    const refreshedTokens = response.data.data;
    const refreshedUser = response.data.data.user;
    console.log(refreshedTokens, refreshedUser);

    if (response.data.success) {
      refreshedUser.accessToken = refreshedTokens.accessToken;
      refreshedUser.refreshToken = refreshedTokens.refreshToken;

      // Set access token expiry to 1 hour from now
      refreshedUser.accessTokenExpires = Date.now() + 1000 * 60 * 60;

      // Update `localStorage` with the new user data
      localStorage.setItem('BrightVeilUser', JSON.stringify(refreshedUser));
      console.log('Access token has been refreshed successfully');

      return refreshedUser.accessToken;
    }
  } catch (error:any) {
    console.error('Error refreshing access token:', error);

    // Differentiate between different types of errors
    if (error.response) {
      // Server responded, but with an error (e.g., 401 Unauthorized)
      if (error.response.status === 401) {
        console.log('Authorization error, invalid refresh token');
        handleLogout();
      } else if ([500, 502, 503].includes(error.response.status)) {
        // Handle server errors (e.g., 500 Internal Server Error, 503 Service Unavailable)
        console.error('Server error while refreshing token, retrying...', error.response);
        await retryRefreshToken(refreshToken); // Retry refreshing the token
      } else {
        // Handle other response errors, e.g., 400 Bad Request, etc.
        console.error('Client-side error occurred', error.response);
        handleLogout();
      }
    } else if (error.request) {
      // Network error: No response was received
      console.error('Network error occurred. Retrying...', error.request);
      await retryRefreshToken(refreshToken); // Retry the request
    } else {
      // Error occurred while setting up the request
      console.error('Error setting up request', error.message);
    }

    return null;
  }

  return null;
}


// Retry logic with exponential backoff + jitter
async function retryRefreshToken(refreshToken: string, attempt = 1): Promise<string | null> {
  const maxAttempts = 3; // Max retry attempts
  const baseDelay = Math.pow(2, attempt) * 1000; // Exponential backoff (e.g., 2, 4, 8 seconds)
  const jitter = Math.random() * 1000; // Random jitter between 0 and 1000ms

  const delay = baseDelay + jitter;

  if (attempt <= maxAttempts) {
    try {
      // Try to refresh the token again
      return await refreshAccessToken(refreshToken);
    } catch (error) {
      // Wait for the delay before retrying
      console.log(`Retrying refresh access token, attempt #${attempt}...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return await retryRefreshToken(refreshToken, attempt + 1); // Retry
    }
  } else {
    // Max retry attempts reached, log out user
    console.error('Max retry attempts reached, logging out...');
    handleLogout();
    return null;
  }
}

// Logout function
function handleLogout() {
  // Handle logout actions (e.g., clear local storage, redirect to login)
  if (typeof window !== 'undefined') {
    localStorage.removeItem('BrightVeilUser');
    if (!window.location.pathname.startsWith('/auth')) {
      window.location.href = '/auth/sign-in';
    }
  }
}

const getUniqueId = () => {
  // First, check if the unique ID exists in cookies
  const cookieId = document.cookie.split('; ').find(row => row.startsWith('uniqueId='));

  if (cookieId) {
    return cookieId.split('=')[1]; // Extract the value of the uniqueId cookie
  }

  // Fallback to localStorage if cookie is not found
  return localStorage.getItem('uniqueId');
};

export default api;
