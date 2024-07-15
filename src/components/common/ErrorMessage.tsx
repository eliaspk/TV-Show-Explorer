import React from "react";

interface ErrorMessageProps {
  message: string;
  title?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  title = "Error",
}) => {
  return (
    <div className="text-center py-4 px-6 mx-auto max-w-2xl bg-red-100 border border-red-400 text-red-700 rounded-lg">
      <p className="font-semibold">{title}</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
