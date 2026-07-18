import axios from "axios";

const API = axios.create({
  baseURL: "https://lostfindapp-backend.onrender.com/api",
});

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export default API;