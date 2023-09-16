import React from "react";
import CN from "classnames";

interface ButtonProps {
  title?: string;
  color?:
    | "attention"
    | "primary"
    | "tertiary"
    | "basic"
    | "secondary"
    | undefined;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  color,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={CN(
        `rounded-md border p-3 sm:p-2 my-2 sm:my-1 hover:opacity-60 cursor-pointer w-full text-white text-sm sm:text-base`,
        {
          "bg-red-600": color === "attention",
          "bg-green-600": color === "primary",
          "bg-yellow-500": color === "tertiary",
          "bg-slate-500": color === "basic",
          "bg-blue-500": color === "secondary",
        }
      )}
    >
      {title}
      {children}
    </button>
  );
};

export default Button;
//
