import { Loader2 } from "lucide-react";
import React from "react";

interface ActionButtonProps {
  text: string;
  loadingText?: string;
  isLoading: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  isLoading,
  type = "button",
  variant = "primary",
  fullWidth = false,
  className = "",
  disabled = false,
}) => {
  const baseStyle = `
    flex justify-center items-center py-2 px-4 border border-transparent
    text-sm font-medium rounded-md
    transition-colors duration-150 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const variantStyles = {
    primary: `
      text-white bg-blue-600 hover:bg-blue-700
      focus:ring-blue-500
      disabled:bg-blue-300
    `,
    secondary: `
      text-blue-700 bg-blue-100 hover:bg-blue-200
      focus:ring-blue-500
      disabled:bg-blue-50 disabled:text-blue-400
    `,
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      disabled={isLoading || disabled}
      className={`
        ${baseStyle}
        ${variantStyles[variant]}
        ${widthStyle}
        ${isLoading || disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        ${className}
      `}
    >
      {isLoading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : text}
    </button>
  );
};

export default ActionButton;
