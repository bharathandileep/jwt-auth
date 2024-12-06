import axios from "axios";

const { VITE_SERVER_URL } = import.meta.env;

const options = {
  baseURL: VITE_SERVER_URL,
  withCredentials: true,
};

export const API = axios.create(options);
