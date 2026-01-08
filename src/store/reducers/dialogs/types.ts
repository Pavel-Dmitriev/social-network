import { InferActionsTypes } from "store/types";
import { SEND_MESSAGE } from "./constants";
import { actions } from ".";

export type ActionsType = InferActionsTypes<typeof actions>;

export type InitialStateType = {
  dialogsData: DialogType[];
  messages: MessageType[];
};

export type DialogType = { id: number; name: string; avatar: string };
export type MessageType = { id: number; message: string };

export type SendMessageActionCreatorMessageType = {
  type: typeof SEND_MESSAGE;
  newMessageBody: string;
};
