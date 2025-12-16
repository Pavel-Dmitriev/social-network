import { InitialStateType } from "./types";

export const SEND_MESSAGE = "SEND-MESSAGE";

export const INITIAL_STATE: InitialStateType = {
  //Диалоги в Dialogs.jsx
  dialogsData: [
    {
      id: 1,
      name: "Andrey",
      avatar: "https://instaturbo.ru/images/blog/5bbe5b813ffd5.jpg",
    },
    {
      id: 2,
      name: "Pasha",
      avatar: "https://download-cs.net/steam/avatars/3065.jpg",
    },
  ],
  //Сообщения в Dialogs.jsx
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How are you" },
    { id: 3, message: "Goood" },
  ],
};
