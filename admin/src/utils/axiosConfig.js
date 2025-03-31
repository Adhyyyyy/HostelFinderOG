import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8800/api", // Make sure this matches your backend URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

export default axiosInstance; 