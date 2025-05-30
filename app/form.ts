import { FormType, FieldType } from "./types";

export default class Form implements FormType {
  name: string;
  year: string;
  description: string;
  link: string;
  fields: FieldType[];
  sheetId: string | undefined;
  range: string;

  constructor({
    name,
    year,
    description,
    link,
    sheetId,
    range,
    fields
  }: FormType) {
    this.name = name;
    this.year = year;
    this.description = description;
    this.link = link;
    this.sheetId = sheetId;
    this.range = range;
    this.fields = fields;
  }
}
