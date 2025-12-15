import { getCaptchaUrl } from ".";
import { GET_CAPTCHA_URL_SUCCESS, SET_USER_DATA } from "./constants";

export type InitialStateType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  captchaUrl: string | null;
};

type PayloadUserData = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

export type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload: PayloadUserData;
};

export type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  payload: { captchaUrl: string };
};
