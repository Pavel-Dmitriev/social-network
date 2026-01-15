import { instance } from "api";
import { profileAPI } from "./profile-api";
import { ApiResponseType, GetItemsType } from "./types";

export const usersAPI = {
  getUsers(
    currentPage = 1,
    pageSize = 20,
    term = "",
    friend: null | boolean = null
  ) {
    const termQuery = term ? `&term=${term}` : "";
    const friendQuery = friend !== null ? `&friend=${friend}` : "";

    return instance
      .get<GetItemsType>(
        `users?page=${currentPage}&count=${pageSize}${termQuery}${friendQuery}`
      )
      .then((res) => res.data);
  },
  follow(userId: number) {
    return instance
      .post<ApiResponseType>(`follow/${userId}`)
      .then((res) => res.data);
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
