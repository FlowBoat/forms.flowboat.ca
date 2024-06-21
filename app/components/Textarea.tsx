import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";

interface TextareaProps {
  label?: string;
  description?: string | JSX.Element;
  minrows: number;
  placeholder?: string;
  required?: boolean;
  requiredMessage?: string;
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
        placeholder={props.placeholder}
        minRows={props.minrows}
        required={props.required}
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

export default Textarea;
