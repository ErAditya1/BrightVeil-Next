import axios from 'axios';

console.log(process.env.SERVER_URI);
export const API_URL = process.env.NODE_ENV === 'production' ? 'https://lms-backend-mh2d.onrender.com/api' : 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    // Check if we are running on the client-side
    if (typeof window === 'undefined') {
      return config;
    }

    const storedUser = localStorage.getItem('BrightVeilUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

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
// Refresh access token using the refresh token
async function refreshAccessToken(refreshToken: string): Promise<string | null> {
    try {
      const response = await axios.patch(`${API_URL}/v1/users/refresh-token`, { refreshToken });
      const refreshedTokens = response.data.data;
      const refreshedUser = response.data.data.user;
  
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
    } catch (error) {
      console.error('Error refreshing access token:', error);
  
      // Redirect to sign-in if refresh fails
      if (typeof window !== 'undefined') {
        localStorage.removeItem('BrightVeilUser');
        // Prevent multiple redirects
        if (!window.location.pathname.includes('/sign-in')) {
          window.location.href = '/sign-in';
        }
      }
      return null; // Explicit return null in the catch block
    }
  
    // Add this explicit return statement
    return null;
  }
  

export default api;
