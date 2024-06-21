import { TextField } from "@radix-ui/themes";

interface InputProps {
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  requiredMessage?: string;
  type?: any;
}

const Input = (props: InputProps) => {

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    const target = e.target as HTMLInputElement;

    if (target.value === "" && props.required) {
      target.setCustomValidity(props.requiredMessage || "This field is required."); 
    } else {
      target.setCustomValidity("");
    }
  }

  return (
    <div>
      <label>{props.label}</label>
      {props.description && (
        <p className="text-sm text-neutral-400">{props.description}</p>
      )}
      <TextField.Root
        size="3"
        className="mt-2"
        placeholder={props.placeholder}
        // required={props.required}
        type={props.type}
        onChange={(e) => {handleChange(e)}}
      />
    </div>
  );
};

export default Input;
