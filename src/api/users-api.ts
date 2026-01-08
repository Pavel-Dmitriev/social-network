import { instance } from "api";
import { profileAPI } from "./profile-api";
import { ApiResponseType, GetItemsType } from "./types";

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 20) {
    return instance
      .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(userId: number) {
    return instance.post<boolean>(`follow/${userId}`).then((res) => res);
  },
  unfollow(userId: number) {
    return instance
      .delete(`follow/${userId}`)
      .then((res) => res.data) as Promise<ApiResponseType>;
  },
  getProfile(userId: number) {
    console.warn("Obsolete method. Please profileAPI object.");
    return profileAPI.getUserProfile(userId);
  },
};
