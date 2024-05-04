import AIIcon from "assets/ai-icon.svg";
import { type FC, type HTMLProps } from "react";

const AiButton: FC<HTMLProps<HTMLButtonElement>> = ({ style, onClick }) => {
  return (
    <button
      className="absolute rounded-full flex justify-center items-center shadow-md z-10 h-[32px] w-[32px] bg-white"
      style={style}
      onClick={onClick}>
      <img src={AIIcon} alt="AI Icon" />
    </button>
  );
};

export default AiButton;
