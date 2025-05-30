export type FieldType = {
  name: string;
  label: string;
  description?: string;
  required: boolean;
  placeholder: string;
  type: "input" | "textarea" | "select";
  requiredMessage?: string;
  options?: string[];
  validation?: (value: string) => boolean;
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
