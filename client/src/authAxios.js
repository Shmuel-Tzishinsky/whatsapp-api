import axios from "axios";

export const authAxios = () => {
  return axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
  });
};
