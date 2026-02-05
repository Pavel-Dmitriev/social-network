import { useState } from "react";
import { sendMessage } from "store/reducers/chat";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "store/redux-store";

const MessageForm = () => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state?.chat?.status);

  const sendMessageHandler = () => {
    if (!message) return;

    dispatch(sendMessage(message));
    setMessage("");
  };

  return (
    <div>
      <textarea
        name="message"
        onChange={(e) => setMessage(e.currentTarget.value)}
        value={message}
      />
      <button disabled={status !== "ready"} onClick={sendMessageHandler}>
        Отправить
      </button>
    </div>
  );
};

export default MessageForm;
