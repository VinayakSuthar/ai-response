import arrowSvg from "assets/arrow.svg";
import insertSvg from "assets/insert.svg";
import { useState, type ChangeEvent, type FC, type HTMLProps } from "react";

import Button from "./Button";
import { ChatView } from "./ChatView";
import Message from "./Message";

type PromptModalProps = {
  // define any props here
  onClose: () => void;
} & HTMLProps<HTMLDivElement>;

export type Message = {
  text: string;
  id: string;
};

const DUMMY_RESPONSE =
  "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

const DUMMY_MESSAGE: Message = {
  id: crypto.randomUUID(),
  text: DUMMY_RESPONSE
};

const PromptModal: FC<PromptModalProps> = ({ onClose, style }) => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const showChat = messages.length > 0;
  const showRegenerateButton = prompt.length === 0 && messages.length > 0;
  const showInsertButton = messages.length > 0;

  function handlePromptChange(e: ChangeEvent<HTMLInputElement>) {
    setPrompt(e.target.value);
  }

  function handleGenerate() {
    setMessages([
      ...messages,
      { text: prompt, id: crypto.randomUUID() },
      DUMMY_MESSAGE
    ]);
    setPrompt("");
  }

  function handleInsert() {
    const msgInput = document.querySelector(
      ".msg-form__contenteditable > p"
    ) as HTMLElement;
    if (msgInput) {
      // insert the last message into the input field
      msgInput.textContent = messages.at(-1).text;
      const inputEvent = new Event("input", { bubbles: true });
      // dispatch an input event to remove placeholder text
      msgInput.dispatchEvent(inputEvent);
      onClose();
    }
  }

  return (
    <div className="fixed z-10 w-screen h-screen">
      <div className="relative w-full h-full bg-[#0D0D1233]" onClick={onClose}>
        <div
          className="absolute rounded-xl bg-[#F9FAFB] py-6 bottom-[300px]"
          style={style}
          onClick={(e) => e.stopPropagation()}>
          {showChat && <ChatView chatList={messages} className="mb-4 px-6" />}
          <div className="px-6">
            <form>
              <input
                type="text"
                value={prompt}
                onChange={handlePromptChange}
                className="w-full h-[35px] mb-5 text-lg p-4 rounded-lg border border-gray-300"
                placeholder="Your prompt"
              />
              <div className="flex gap-x-5 justify-end">
                {showInsertButton && (
                  <Button
                    variant="secondary"
                    onClick={handleInsert}
                    className="flex items-center gap-x-2">
                    <img src={insertSvg} className="w-[10px]" alt="insert" />
                    Insert
                  </Button>
                )}
                {showRegenerateButton ? (
                  <Button className="flex items-center gap-x-2">
                    <img src={arrowSvg} className="w-6" alt="Generate" />
                    <span>Regenerate</span>
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex items-center gap-x-2"
                    onClick={handleGenerate}>
                    <img src={arrowSvg} className="w-6" alt="Generate" />
                    <span>Generate</span>
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
