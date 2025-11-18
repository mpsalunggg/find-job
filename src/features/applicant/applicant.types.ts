export interface FormFieldType {
  id: string;
  key: string;
  label: string;
  fieldType: string;
  placeholder: string | null;
  helpText: string | null;
  order: number;
  requirement: string;
}

export interface ListFormFieldResponse {
  job: {
    title: string;
  };
  formFields: FormFieldType[];
}
