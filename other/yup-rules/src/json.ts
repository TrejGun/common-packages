import { string } from "yup";

const isValidJSON = (value?: string): any => {
  try {
    JSON.parse(value!);
  } catch (e) {
    return false;
  }

  return true;
};

export const jsonValidationSchema = string()
  .required("form.validations.valueMissing")
  .test("is-json", "form.validations.invalidJSON", isValidJSON);
