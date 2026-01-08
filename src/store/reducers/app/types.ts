import { ThunkAction } from "redux-thunk";
import { INITIALIZED_SUCCESS } from "./constants";
import { AppStateType } from "store/redux-store";
import { InferActionsTypes } from "store/types";
import { actions } from ".";

export type ActionsType = InferActionsTypes<typeof actions>;

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
