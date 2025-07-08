import "./Button.scss";
import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "default" | "subtle";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export default function Button({
  variant = "default",
  className = "",
  ...props
}: ButtonProps) {
  const variantClass = `ui-button--${variant}`;
  return (
    <button
      className={`ui-button ${variantClass} ${className}`.trim()}
      {...props}
    >
      {props.children}
    </button>
  );
}
