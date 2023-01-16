import axios from "axios";

export const serve = axios.create({
  baseURL: "https://api.github.com/search",
  timeout: 10000,
});
