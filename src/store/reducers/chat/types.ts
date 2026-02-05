import { ThunkAction } from "redux-thunk";
import { AppStateType } from "store/redux-store";
import { InferActionsTypes } from "store/types";
import { actions } from ".";
import { ChatMessageAPIType, StatusType } from "api/types";
import { MESSAGES_RECEIVED } from "./constants";

export type ChatMessageType = ChatMessageAPIType & { id: string };

export type ActionsType = InferActionsTypes<typeof actions>;

export type initializedSuccessActionType = {
  type: typeof MESSAGES_RECEIVED;
};

export type InitialStateType = {
  messages: ChatMessageType[];
  status: StatusType;
};

export type ThunkType = ThunkAction<
  void,
  AppStateType,
  unknown,
  initializedSuccessActionType
>;
