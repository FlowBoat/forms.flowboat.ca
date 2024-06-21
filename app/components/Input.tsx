import { TextField } from "@radix-ui/themes";
import { useState } from "react";

interface InputProps {
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  requiredMessage?: string;
  type?: any;
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
        onChange={(e) => {
          onChange(e);
        }}
      />
      <p
        className={`text-sm text-red-400 transition-all ${invalid ? "opacity-100 max-h-scroll" : "opacity-0 h-0"}`}
      >
        {props.requiredMessage}
      </p>
    </div>
  );
};

export default Input;
