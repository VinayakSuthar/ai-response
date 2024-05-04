import React, { useEffect, useRef, type FC, type HTMLAttributes } from "react";

import Message from "./Message";
import type { Message as MessageType } from "./PromptModal";

type ChatProps = {
  chatList: MessageType[];
} & HTMLAttributes<HTMLDivElement>;

export const ChatView: FC<ChatProps> = ({ chatList, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // scroll to the bottom of the chat container
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chatList]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-y-4 max-h-[350px] overflow-scroll ${className}`}>
      {chatList.map(({ id, text }, index) => {
        const isRight = index % 2 === 0;
        return (
          <Message
            key={id}
            className={`${isRight ? "self-end" : "self-start"} max-w-[330px]`}
            variant={isRight ? "secondary" : "primary"}>
            {text}
          </Message>
        );
      })}
    </div>
  );
};
