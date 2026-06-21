import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export default API;