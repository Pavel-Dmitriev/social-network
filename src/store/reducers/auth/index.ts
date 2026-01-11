import { stopSubmit } from "redux-form";

import { authAPI, securityAPI } from "api";

import {
  GET_CAPTCHA_URL_SUCCESS,
  INITIAL_STATE,
  SET_USER_DATA,
} from "./constants";
import {
  ActionsTypes,
  GetCaptchaUrlSuccessActionType,
  InitialStateType,
  SetAuthUserDataActionType,
  ThunkType,
} from "./types";
import { ResultCodeForCaptchaEnum, ResultCodesEnum } from "api/enums";

const authReducer = (
  state: InitialStateType = INITIAL_STATE,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ): SetAuthUserDataActionType =>
    ({
      type: SET_USER_DATA,
      payload: { userId, email, login, isAuth },
    } as const),
  getCaptchaUrlSuccess: (captchaUrl: string): GetCaptchaUrlSuccessActionType =>
    ({
      type: GET_CAPTCHA_URL_SUCCESS,
      payload: { captchaUrl },
    } as const),
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const data = await authAPI.me();

  if (data?.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = data.data ?? {};
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const login =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ): ThunkType =>
  async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      const message =
        data.messages.length > 0 ? data.messages[0] : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
    }
  };

export const logout = (): ThunkType => async (dispatch) => {
  const data = await authAPI.logout();
  debugger;
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
