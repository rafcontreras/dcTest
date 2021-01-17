/* eslint-disable sonarjs/no-duplicate-string */

import { isRequired } from "../inputValidations";

const itemInputs = [
  {
    type: "text",
    name: "title",
    label: "Item",
    placeholder: "Enter the name of the item",
    extra: {
      errorMessages: {
        empty: "Please enter the name of the item"
      },
      inputProps: {
        autoCapitalize: "off",
        autoComplete: "off",
        autoCorrect: "off",
        autoFocus: true,
        maxLength: 255,
        minLength: 1,
        spellCheck: false
      }
    },
    validators: [isRequired]
  }
];

export default itemInputs;
