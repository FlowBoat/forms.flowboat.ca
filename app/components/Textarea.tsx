import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";

interface TextareaProps {
  name: string;
  label?: string;
  description?: string | JSX.Element;
  minrows: number;
  placeholder?: string;
  required?: boolean;
  requiredMessage?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = (props: TextareaProps) => {
  const [invalid, setInvalid] = useState<boolean>(false);

  const onInvalid = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    const target = e.target as HTMLTextAreaElement;

    target.setCustomValidity("");
    setInvalid(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <TextareaAutosize
        className="mt-2"
        name={props.name}
        placeholder={props.placeholder}
        minRows={props.minrows}
        required={props.required}
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

export default Textarea;
