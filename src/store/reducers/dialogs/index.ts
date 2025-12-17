import { INITIAL_STATE, SEND_MESSAGE } from "./constants";
import { InitialStateType, SendMessageActionCreatorMessageType } from "./types";

const dialogsReducer = (
  state: InitialStateType = INITIAL_STATE,
  action: SendMessageActionCreatorMessageType
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

//action creators для сообщений
export const sendMessageActionCreator = (
  newMessageBody: string
): SendMessageActionCreatorMessageType => {
  return {
    type: SEND_MESSAGE,
    newMessageBody,
  };
};

export default dialogsReducer;
