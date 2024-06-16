import axios from "axios";

console.log(import.meta.env.API_BASE_URL);
const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (formData) => {
  try {
    const { data } = await API.post("/users/login", formData);
    console.log(data);
    return data?.data?.user;
  } catch (error) {
    console.log(error);
    throw error?.response?.data;
  }
};

export const logout = async () => {
  try {
    const { data } = await API.post("/users/logout");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await API.get("/users/current-user");
    return data?.data?.user;
  } catch (error) {
    console.log(error);
  }
};
