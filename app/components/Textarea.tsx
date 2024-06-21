import { TextArea } from "@radix-ui/themes";
import TextareaAutosize from 'react-textarea-autosize';

interface TextareaProps {
  label?: string;
  description?: string | JSX.Element;
  minrows: number;
  placeholder?: string;
  required?: boolean;
  requiredMessage?: string;
}

const Textarea = (props: TextareaProps) => {
  return (
    <div>
      <label>{props.label}</label>
      {props.description && <p className="text-sm text-neutral-400">{props.description}</p>}
      <TextareaAutosize className="mt-2" placeholder={props.placeholder} minRows={props.minrows} required={props.required}>
      </TextareaAutosize>
    </div>
  );
};

export default Textarea;
