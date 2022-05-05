import * as Yup from "yup";

import { emptyStateString, simpleFormatting } from "@gemunion/draft-js-utils";

import "./draft-has-test";

const ERROR_MESSAGE = "ERROR_MESSAGE";

const schemaValidatorObject = Yup.object().shape({
  // @ts-ignore
  description: Yup.string().draftHasText(ERROR_MESSAGE),
});

describe("Draft", () => {
  it("has no text", async () => {
    await expect(
      schemaValidatorObject.validate({
        description: emptyStateString,
      }),
    ).rejects.toEqual(new Yup.ValidationError(ERROR_MESSAGE));
  });

  it("has text", async () => {
    await expect(
      schemaValidatorObject.validate({
        description: simpleFormatting,
      }),
    ).resolves.toEqual({
      description: simpleFormatting,
    });
  });
});