import { FormType, FieldType } from "./types";

export default class Form implements FormType {
  name: string; // the name of the form ie. "Flowboat Member Application"
  year: string; // the year the form is for ie. "2024-2025"
  description: string; // the description ie. "Accelerating the ideas of tomorrow."
  link: string; // the link to the form ie. "2024-member-application". The route will be `/forms/${link}`
  fields: FieldType[];
  sheetId: string | undefined; // the id of the Google sheet. Get this from your Google sheet url ie. "1LH_SylMKjJZ5uY47DSwsOOv1vhEhoqknjIAjhGKeBQQ"
  range: string; // the range of the sheet ie. "A:Z". This is the range of the sheet that you want to use.
  enabled: boolean; // whether the form is enabled (will have its own route/be accessible)
  columns: string[]; // the exact column order of the sheet, ie. ["timestamp", "grade", "name", ...]. Defaults to ["timestamp", ...fields in declared order].

  constructor({
    name,
    year,
    description,
    link,
    sheetId,
    range,
    fields,
    enabled,
    columns
  }: FormType) {
    this.name = name;
    this.year = year;
    this.description = description;
    this.link = link;
    this.sheetId = sheetId;
    this.range = range;
    this.fields = fields;
    this.enabled = enabled;
    this.columns = columns ?? ["timestamp", ...fields.map((f) => f.name)];
  }
}
