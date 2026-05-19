import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

api.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem("auth") || "null");
  if (auth?.user) {
    config.headers["x-user-role"] = auth.user.role;
    config.headers["x-user-id"] = auth.user.id;
    config.headers["x-user-name"] = auth.user.username;
  }
  return config;
});

export default api;
