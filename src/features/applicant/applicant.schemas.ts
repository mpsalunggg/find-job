import z from "zod";
import { FormFieldType } from "./applicant.types";
import { checkMandatory } from "./applicant.utils";

export const generateZodSchema = (fields: FormFieldType[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shape: Record<string, any> = {};

  fields.forEach((f) => {
    const isMandatory = checkMandatory(f.requirement);

    let schema;

    switch (f.fieldType) {
      case "text":
      case "radio":
      case "select":
        schema = z.string();
        if (isMandatory) {
          schema = schema.min(1, { message: `${f.label} is required` });
        } else {
          schema = schema.optional().or(z.literal(""));
        }
        break;

      case "email":
        schema = z.email(
          "Please enter your email in the format: name@example.com"
        );
        if (isMandatory) {
          schema = schema.min(1, { message: `${f.label} is required` });
        } else {
          schema = schema.optional().or(z.literal(""));
        }
        break;

      case "tel":
        schema = z.string();
        if (isMandatory) {
          schema = schema.min(1, { message: `${f.label} is required` });
        } else {
          schema = schema.optional();
        }
        break;

      case "url":
        schema = z.url(
          "Please copy paste your Linkedin URL, example: https://www.linkedin.com/in/username"
        );
        if (isMandatory) {
          schema = schema.min(1, { message: `${f.label} is required` });
        } else {
          schema = schema.optional().or(z.literal(""));
        }
        break;

      case "date":
        if (isMandatory) {
          schema = z.date(`${f.label} is required`);
        } else {
          schema = z.coerce.date().optional().nullable();
        }
        break;

      case "file":
        schema = z.string();
        if (isMandatory) {
          schema = schema.min(1, { message: `${f.label} is required` });
        } else {
          schema = schema.optional().or(z.literal(""));
        }
        break;

      default:
        schema = isMandatory ? z.any() : z.any().optional();
    }

    shape[f.key] = schema;
  });

  return z.object(shape);
};
