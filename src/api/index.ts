import axios from "axios";

import { authAPI } from "./auth-api";
import { profileAPI } from "./profile-api";
import { usersAPI } from "./users-api";
import { securityAPI } from "./security-api";
import { chatAPI } from "./chat-api";

// import { requestUsers } from "../store/reducers/users";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
});

// Перехватываем запрос и добавляем токен к заголовку headers
instance.interceptors.request.use((config) => {
  config.headers["Authorization"] =
    "Bearer " + localStorage.getItem("auth-token");

  return config;
});

export { authAPI, profileAPI, usersAPI, securityAPI, chatAPI };
