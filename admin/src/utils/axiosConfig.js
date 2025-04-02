import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://hostel-finder-api.onrender.com/api",
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add CORS headers to each request
    config.headers = {
      ...config.headers,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    };
    console.log('Request being sent:', config);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response received:', response);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance; 