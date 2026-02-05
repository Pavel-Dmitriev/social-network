import React from "react";
import { IChatMessage } from "./interface";

const Message: React.FC<{ message: IChatMessage }> = React.memo(
  ({ message }) => {
    return (
      <div className="flex flex-col">
        <img src={message.photo} width={40} height={40} />
        <b>{message.userName}</b>
        {message.message}
      </div>
    );
  },
);

export default Message;
