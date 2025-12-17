import { ThunkAction } from "redux-thunk";
import { INITIALIZED_SUCCESS } from "./constants";
import { AppStateType } from "store/redux-store";

export type initializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS;
};

export type InitialStateType = {
  initialized: boolean;
  globalError: null;
};

export type ThunkType = ThunkAction<
  void,
  AppStateType,
  unknown,
  initializedSuccessActionType
>;
