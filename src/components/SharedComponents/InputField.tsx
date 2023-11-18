import React from "react";
import MessageError from "./MessageError";

import PasswordTooltip from "../PasswordTooltip";
import clsx from "clsx";

interface InputFieldProps {
  label: string;
  type: "text" | "password" | "email" | "phone";
  register: any;
  name: string;
  error?: string | undefined;
  isVisible?: boolean;
  value?: string | null;
}

export const labelClass = clsx(
  "block",
  "mb-2",
  "text-sm",
  "font-medium",
  " text-green-600",
  " dark:text-white"
);

const inputClass = clsx(
  "bg-gray-50",
  "border",
  "border-gray-300",
  " text-gray-900",
  " sm:text-sm",
  " rounded-lg",
  " focus:ring-primary-600",
  " focus:border-primary-600",
  " block",
  " w-full",
  " p-2.5",
  " dark:bg-gray-700",
  " dark:border-gray-600",
  " dark:placeholder-gray-400",
  " dark:text-white",
  " dark:focus:ring-blue-500",
  " dark:focus:border-blue-500"
);

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  register,
  name,
  error,
  isVisible,
  value,
}) => (
  <div>
    <div className="flex flex-row">
      <label className={labelClass}>{label}</label>
      {type === "password" && (
        <div className="px-2">
          <PasswordTooltip content="At least 8 characters including one Number, Uppercase, and Special Symbol required" />
        </div>
      )}
    </div>
    <input
      value={value}
      {...register(name, {
        required: `${label} is required`,
        pattern: {
          value:
            type === "email"
              ? /\S+@\S+\.\S+/
              : type === "phone"
              ? /^([+]\d{2}[ ])?\d{10}$/
              : /^[a-zA-Z0-9\S\s]+$/, // Allow alphabets (both uppercase and lowercase) and spaces
          message:
            type === "password"
              ? `${label} must be at least 8 characters and include one number, one uppercase letter, and one special character`
              : type === "phone"
              ? "Phone Number should have 10 numbers and country code"
              : `${label} is invalid`,
        },
      })}
      type={type === "password" && isVisible ? "text" : type}
      className={inputClass}
    />
    <MessageError errorMessage={error} />
  </div>
);

export default InputField;
