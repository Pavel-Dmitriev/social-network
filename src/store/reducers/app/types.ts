import { INITIALIZED_SUCCESS } from "./constants";

export type initializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS;
};

export type InitialStateType = {
  initialized: boolean;
  globalError: null;
};
