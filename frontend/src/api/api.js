import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // add this line
});

export const login = async (formData) => {
  console.log(formData, "api call login");
  try {
    const { data } = await API.post("/users/login", formData);
    return data?.data?.user;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const { data } = await API.post("/users/logout");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await API.get("/users/current-user");
    return data;
  } catch (error) {
    console.log(error);
  }
};
