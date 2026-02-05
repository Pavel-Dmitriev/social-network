import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import { AppStateType } from "store/redux-store";

const Messages = () => {
  const messages = useSelector((state: AppStateType) => state?.chat?.messages);
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight,
      ) < 300
    ) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      style={{ height: "400px", overflowY: "auto" }}
      onScroll={scrollHandler}
    >
      {messages.map((m: any, index: number) => (
        <Message key={m.id} message={m} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </div>
  );
};

export default Messages;
