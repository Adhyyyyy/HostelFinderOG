import axios from "axios";

const instance = axios.create({
  baseURL: "https://hostel-finder-api.onrender.com/api",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default instance; 