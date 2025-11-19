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

export interface ApplyJobPayload {
  jobId: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  photoUrl?: string;
  gender?: string;
  domicile?: string;
  linkedinUrl?: string;
  dateOfBirth?: string;
}
