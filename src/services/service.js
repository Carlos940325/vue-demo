import axios from "axios";

export const serve = axios.create({
  baseURL: "https://",
  timeout: 10000,
});
