export interface ListFormFieldResponse {
  job: {
    title: string;
  };
  formField: {
    id: string;
    key: string;
    label: string;
    fieldType: string;
    placeholder: string | null;
    helpText: string | null;
    order: number;
  }[];
}
