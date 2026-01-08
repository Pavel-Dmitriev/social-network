import { INITIAL_STATE, SEND_MESSAGE } from "./constants";
import {
  ActionsType,
  InitialStateType,
  SendMessageActionCreatorMessageType,
} from "./types";

const dialogsReducer = (
  state: InitialStateType = INITIAL_STATE,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 4, message: body }],
      };
    }
    default:
      return state;
  }
};

export const actions = {
  sendMessageActionCreator: (
    newMessageBody: string
  ): SendMessageActionCreatorMessageType =>
    ({
      type: SEND_MESSAGE,
      newMessageBody,
    } as const),
};

export default dialogsReducer;
