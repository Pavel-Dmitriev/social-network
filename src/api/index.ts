import axios from "axios";

import { authAPI } from "./auth-api";
import { profileAPI } from "./profile-api";
import { usersAPI } from "./users-api";
import { securityAPI } from "./security-api";

import { requestUsers } from "../store/reducers/users";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "f4d671cf-783c-4538-b03e-f8432a796565",
  },
  withCredentials: true,
});

export { authAPI, profileAPI, usersAPI, securityAPI };
