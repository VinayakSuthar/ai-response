import React, { type FC, type HTMLAttributes, type ReactNode } from "react";

type MessageProps = {
  variant?: "primary" | "secondary";
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const variantClasses = {
  primary: "bg-[#DBEAFE]",
  secondary: "bg-[#DFE1E7]"
};

const Message: FC<MessageProps> = ({
  variant = "primary",
  className = "",
  children
}) => {
  return (
    <div
      className={`text-[#666D80] text-lg p-3 rounded-md ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Message;
