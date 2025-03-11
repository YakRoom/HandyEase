import React, { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  children,
  className = "",
}) => {
  return (
    <div data-error={!!error} className={className}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input: React.FC<InputProps> = ({ error, className = "", ...props }) => {
  return (
    <input
      className={`p-2 border rounded-md text-sm ${
        error ? "border-red-500" : ""
      } ${className}`}
      {...props}
    />
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  error,
  className = "",
  ...props
}) => {
  return (
    <textarea
      className={`w-full p-2 border rounded-md text-sm ${
        error ? "border-red-500" : ""
      } ${className}`}
      {...props}
    />
  );
};
