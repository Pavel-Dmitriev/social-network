import { getAuthUserData } from "../auth";

import { INITIALIZED_SUCCESS } from "./constants";

import { ActionsType, InitialStateType, ThunkType } from "./types";

let initialState = {
  initialized: false,
  globalError: null,
};

export const actions = {
  initializedSuccess: () =>
    ({
      type: INITIALIZED_SUCCESS,
    } as const),
};

const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
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

export const initializeApp = (): ThunkType => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(actions.initializedSuccess());
  });
};

export default appReducer;
