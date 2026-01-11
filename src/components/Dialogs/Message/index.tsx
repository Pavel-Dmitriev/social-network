import React from "react";

const Message: React.FC<{ messages: string }> = (props) => {
  return (
    <div>
      <div>{props.messages}</div>
    </div>
  );
};

export default Message;
