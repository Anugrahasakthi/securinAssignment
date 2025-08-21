// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://127.0.0.1:5000/api",
// });

// export const getRecipes = (page = 1, limit = 10) =>
//   API.get(`/recipes?page=${page}&limit=${limit}`);

// export const searchRecipes = (params) =>
//   API.get("/recipes/search", { params });

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api", // Flask backend
});

export default api;
