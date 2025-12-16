import { getAuthUserData } from "../auth";

import { INITIALIZED_SUCCESS } from "./constants";

import { initializedSuccessActionType, InitialStateType } from "./types";

let initialState = {
  initialized: false,
  globalError: null,
};

const appReducer = (state: InitialStateType = initialState, action: any) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS: {
      return {
        ...state,
        initialized: true,
      };
    }
    default:
      return state;
  }
};

export const initializedSuccess: () => initializedSuccessActionType = () => ({
  type: INITIALIZED_SUCCESS,
});

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess());
  });
};

export default appReducer;
