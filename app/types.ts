export type FieldType = {
  name: string; // the name of the field ie. "name"
  label: string; // the label of the field ie. "What is your full name?"
  description?: string; // the description of the field ie. "We all have names, I think."
  required: boolean; // whether the field is required
  placeholder: string; // the placeholder of the field ie. "You can call me..."
  type: "input" | "textarea" | "select"; // the type of the field ie. "input" | "textarea" | "select"
  requiredMessage?: string; // the message to display if the field is required
  options?: string[]; // the options of the field ie. ["Grade 9", "Grade 10", "Grade 11", "Grade 12"]
  validation?: (value: string) => boolean; // the validation function of the field ie. (value: string) => boolean
};

export type FormType = {
  name: string;
  year: string;
  description: string;
  link: string;
  fields: FieldType[];
  sheetId: string | undefined;
  range: string;
};
