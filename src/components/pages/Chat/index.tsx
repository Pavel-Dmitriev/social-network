import { useEffect } from "react";
import MessageForm from "./MessageForm";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import {
  startMessagesListening,
  stopMessagesListening,
} from "store/reducers/chat";
import { AppStateType } from "store/redux-store";

const Chat: React.FC = () => {
  const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state?.chat?.status);

  useEffect(() => {
    dispatch(startMessagesListening());

    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      {status === "error" && (
        <div>Some error occured. Please refresh the page</div>
      )}
      <>
        <Messages />
        <MessageForm />
      </>
    </div>
  );
};

export default Chat;
