import cssText from "data-text:~style.css";
import type { PlasmoCSConfig } from "plasmo";
import { useEffect, useRef, useState } from "react";

import AiButton from "~features/AiButton";
import PromptModal from "~features/PromptModal";

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
};

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

const PlasmoOverlay = () => {
  const [buttonCoordinates, setButtonCoordinates] = useState({
    top: 0,
    left: 0
  });

  const [modalCoordinates, setModalCoordinates] = useState({
    left: 0
  });

  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalWidth, setModalWidth] = useState(0);
  const msgInputRef = useRef(null);

  function handleAiButtonClick() {
    const msgArea = document.querySelector(".msg-s-message-list-container");
    const { left, right } = msgArea.getBoundingClientRect();

    // adding extra padding to the left and right
    setModalCoordinates({ left: left + 10 });
    setModalWidth(right - left - 20);
    setShowModal(true);
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    function handleFocusEvent(e: FocusEvent) {
      const target = e.target as HTMLElement;

      if (target?.classList.contains("msg-form__contenteditable")) {
        clearTimeout(timeoutId);
        msgInputRef.current = target;
        const { right, bottom } = target.getBoundingClientRect();
        setButtonCoordinates({ top: bottom - 40, left: right - 40 });
        setShowButton(true);
      }
    }

    function handleBlurEvent(e: FocusEvent) {
      const target = e.target as HTMLElement;

      if (target?.classList.contains("msg-form__contenteditable")) {
        // delay hiding the button to allow the user to click on it
        timeoutId = setTimeout(() => setShowButton(false), 100);
      }
    }

    const body = document.querySelector("body");
    body.addEventListener("focus", handleFocusEvent, true);
    body.addEventListener("blur", handleBlurEvent, true);

    return () => {
      body.removeEventListener("focus", handleFocusEvent, true);
      body.removeEventListener("blur", handleBlurEvent, true);
    };
  }, [msgInputRef.current]);

  return (
    <div>
      {showButton && (
        <AiButton
          onClick={handleAiButtonClick}
          style={{
            top: `${buttonCoordinates.top}px`,
            left: `${buttonCoordinates.left}px`
          }}
        />
      )}
      {showModal && (
        <PromptModal
          style={{
            width: modalWidth,
            left: `${modalCoordinates.left}px`
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default PlasmoOverlay;
