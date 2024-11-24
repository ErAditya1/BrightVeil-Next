import axios from 'axios';

export const API_URL = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_SERVER_URI
  : 'http://localhost:8000/api';

console.log(API_URL);

const api = axios.create({
  baseURL: API_URL,              // Base URL for all requests
  withCredentials: true,       // Include credentials (cookies) in cross-origin requests
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
});

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    if (typeof window === 'undefined') return config;  // Only run on client-side

    const storedUser = localStorage.getItem('BrightVeilUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    // Check for expired token and refresh if necessary
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

// Check if the token is expired (with 5-minute buffer)
function isTokenExpired(expireTime: number): boolean {
  const currentTime = Date.now();
  return currentTime >= expireTime - 5 * 60 * 1000; // 5-minute buffer before expiry
}

// Refresh access token using the refresh token
async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await axios.patch(`${API_URL}/v1/users/refresh-token`, { refreshToken });
    const refreshedTokens = response.data.data;
    const refreshedUser = response.data.data.user;

    if (response.data.success) {
      refreshedUser.accessToken = refreshedTokens.accessToken;
      refreshedUser.refreshToken = refreshedTokens.refreshToken;
      refreshedUser.accessTokenExpires = Date.now() + 1000 * 60 * 60; // 1 hour expiry

      localStorage.setItem('BrightVeilUser', JSON.stringify(refreshedUser));
      return refreshedUser.accessToken;
    }
  } catch (error) {
    console.error('Error refreshing access token:', error);
    // Log out the user in case of refresh token failure
    localStorage.removeItem('BrightVeilUser');
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/sign-in')) {
      window.location.href = '/sign-in'; // Redirect to sign-in page
    }
    return null;
  }
}

export default api;
