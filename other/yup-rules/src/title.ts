import { string } from "yup";

import { titleMinLength, titleMaxLength } from "@gemunion/constants";

export const titleValidationSchema = string()
  .required("form.validations.valueMissing")
  .min(titleMinLength, "form.validations.tooShort")
  .max(titleMaxLength, "form.validations.tooLong");