import { type ButtonHTMLAttributes, type FC, type ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses = {
  primary: "bg-[#3B82F6] text-white",
  secondary: "bg-white text-[#666D80] border border-[#666D80]"
};

const Button: FC<ButtonProps> = ({
  children,
  type = "button",
  className,
  variant = "primary",
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`rounded-lg px-6 h-[29px] text-xl font-medium ${variantClasses[variant]} ${className}`}
      {...rest}>
      {children}
    </button>
  );
};

export default Button;
