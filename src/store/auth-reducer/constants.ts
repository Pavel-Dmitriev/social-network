import { InitialStateType } from "./types";

export const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA";
export const GET_CAPTCHA_URL_SUCCESS =
  "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS";

export const INITIAL_STATE: InitialStateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};
