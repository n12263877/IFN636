import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/api", // VERY IMPORTANT
});

// attach token
instance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default instance;
