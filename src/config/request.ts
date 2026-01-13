import type { LoginResponse }  from "../pages/auth/types";
import axios from "axios";

export const BASE_URL =  'http://localhost:5000/api/v1'
const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true', 
  }
})
request.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

request.interceptors.response.use(
   (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post<LoginResponse>(
          "http://localhost:5000/api/v1/new-token"
        );

        const newAccessToken = response.data.data.token;
        localStorage.setItem("token", newAccessToken); 

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return request(originalRequest);

      } catch (refreshError) {
        localStorage.removeItem("token"); 
        localStorage.removeItem("role");

        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { request };