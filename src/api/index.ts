import axios from "axios";
import { requestUsers } from "../store/reducers/users";
import { ProfileType } from "store/reducers/profile/types";
import { LoginResponseType, MeResponseType } from "./types";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "f4d671cf-783c-4538-b03e-f8432a796565",
  },
  withCredentials: true,
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 20) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(userId: number) {
    return instance.post(`follow/${userId}`);
  },
  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`);
  },
  getProfile(userId: number) {
    console.warn("Obsolete method. Please profileAPI object.");
    return profileAPI.getUserProfile(userId);
  },
};

export const profileAPI = {
  getUserProfile(userId: number) {
    return instance.get(`profile/` + userId);
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status`, { status: status });
  },
  savePhoto(photoFile: File) {
    const formData = new FormData();
    formData.append("image", photoFile);

    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  saveProfile(profile: ProfileType) {
    return instance.put("profile", profile);
  },
};

export const authAPI = {
  me() {
    return instance.get<MeResponseType>(`auth/me`).then((res) => res?.data);
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: string | null = null
  ) {
    return instance
      .post<LoginResponseType>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res?.data);
  },
  logout() {
    return instance
      .delete<LoginResponseType>(`auth/login`)
      .then((res) => res?.data);
  },
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get("security/get-captcha-url");
  },
};
