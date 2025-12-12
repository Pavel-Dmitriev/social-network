import { INITIALIZED_SUCCESS } from "./constants/initialized_success";

export type initializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS;
};

export type InitialStateType = {
  initialized: boolean;
  globalError: null;
};
