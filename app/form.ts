import { FormType, FieldType } from "./types";

export default class Form implements FormType {
  name: string;
  year: string;
  description: string;
  link: string;
  fields: FieldType[];

  constructor(
    name: string,
    year: string,
    description: string,
    link: string,
    fields: FieldType[]
  ) {
    this.name = name;
    this.year = year;
    this.description = description;
    this.link = link;
    this.fields = fields;
  }
}
