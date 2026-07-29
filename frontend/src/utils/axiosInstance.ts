import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '', // Points to Render backend in production, or uses Vite proxy locally
  withCredentials: true, // Important for sending/receiving HttpOnly cookies
});

// Request interceptor to add the access token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 Unauthorized and refresh the token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const baseURL = import.meta.env.VITE_API_URL || '';
        const { data } = await axios.post(`${baseURL}/api/auth/refresh`, {}, { withCredentials: true });
        
        // Save new access token
        localStorage.setItem('token', data.token);
        
        // Update the authorization header and retry original request
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token is expired or invalid
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.dispatchEvent(new Event('auth-change'));
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
