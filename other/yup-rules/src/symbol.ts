import { string } from "yup";

import { symbolMinLength, symbolMaxLength } from "@gemunion/constants";

export const symbolValidationSchema = string()
  .required("form.validations.valueMissing")
  .min(symbolMinLength, "form.validations.rangeUnderflow")
  .max(symbolMaxLength, "form.validations.rangeUnderflow");
