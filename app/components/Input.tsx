import { TextField } from "@radix-ui/themes";
import { useState } from "react";

interface InputProps {
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  requiredMessage?: string;
  type?: any;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  const [invalid, setInvalid] = useState<boolean>(false);

  const onInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    const target = e.target as HTMLInputElement;

    target.setCustomValidity("");
    setInvalid(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (props.onChange) props.onChange(e);

    setInvalid(false);
  };

  return (
    <div>
      <label>{props.label}</label>
      {props.description && (
        <p className="text-sm text-neutral-400">{props.description}</p>
      )}
      <TextField.Root
        size="3"
        className={`mt-2 ${invalid ? "!outline-red-400" : ""}`}
        placeholder={props.placeholder}
        required={props.required}
        type={props.type}
        onInvalid={(e) => {
          onInvalid(e);
        }}
        value={props.value}
        onChange={(e) => {
          onChange(e);
        }}
      />
      <p
        className={`text-xs text-red-400 transition-all ${invalid ? "opacity-100 max-h-scroll" : "opacity-0 h-0"}`}
      >
        {props.requiredMessage}
      </p>
    </div>
  );
};

export default Input;
