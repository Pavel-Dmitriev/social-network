import { instance } from "api";
import {
  MeResponseDataType,
  LoginResponseDataType,
  ApiResponseType,
} from "./types";
import { ResultCodeForCaptchaEnum, ResultCodesEnum } from "./enums";

export const authAPI = {
  me() {
    return instance
      .get<ApiResponseType<MeResponseDataType>>(`auth/me`)
      .then((res) => res?.data);
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: string | null = null
  ) {
    return instance
      .post<
        ApiResponseType<
          LoginResponseDataType,
          ResultCodesEnum | ResultCodeForCaptchaEnum
        >
      >(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res?.data);
  },
  logout() {
    return instance
      .delete<ApiResponseType>(`auth/login`)
      .then((res) => res.data);
  },
};
