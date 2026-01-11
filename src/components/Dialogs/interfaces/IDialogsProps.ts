import { InitialStateType } from "store/reducers/dialogs/types";

export interface IDialogsProps {
  dialogsPage: InitialStateType;
  sendMessage: (messageText: string) => void;
}
