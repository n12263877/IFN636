import axios from "axios";

const instance = axios.create({
  baseURL: "http://100.27.233.254:5001/api",
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
