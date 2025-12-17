import { getAuthUserData } from "../auth";

import { INITIALIZED_SUCCESS } from "./constants";

import {
  initializedSuccessActionType,
  InitialStateType,
  ThunkType,
} from "./types";

let initialState = {
  initialized: false,
  globalError: null,
};

const appReducer = (
  state: InitialStateType = initialState,
  action: initializedSuccessActionType
) => {
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

export const initializeApp = (): ThunkType => (dispatch) => {
  let promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess());
  });
};

export default appReducer;
