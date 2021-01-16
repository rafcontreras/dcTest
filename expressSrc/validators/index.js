const {
  body,
  param,
  validationResult,
  matchedData
} = require("express-validator");
const { find } = require("../db");

const asyncHandler = asyncFunction => (request, response, next) =>
  Promise.resolve(asyncFunction(request, response, next)).catch(next);

const isNewItem = () => {
  return [
    body("title")
      .exists()
      .withMessage("The title of the item is empty")
      .isString()
      .withMessage("Should be string")
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage("Should have value (after trim)")
  ];
};

const hasItemId = () => {
  return [
    param("itemId")
      .exists()
      .withMessage("The item has no itemId")
      .isString()
      .withMessage("Should be string")
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage("itemId should be string")
  ];
};

const isItem = () => {
  return [
    body("completed")
      .exists()
      .withMessage("The item completion has to be set true or false")
      .isBoolean()
      .withMessage("Should be boolean"),
    ...isNewItem()
  ];
};

const sanitizeRequest = (request, _, next) => {
  matchedData(request, {
    locations: ["body", "params"],
    includeOptionals: true,
    stripUnknown: true
  });

  next();
};

const findItem = asyncHandler(async (request, response, next) => {
  const itemId = request?.params?.itemId;
  if (itemId) {
    try {
      const exists = await find(itemId);
      if (exists && exists !== undefined) {
        return next();
      }
    } catch (error) {
      next(error);
    }
  }

  return response.sendStatus(404);
});

const validateRequest = (request, response, next) => {
  const errors = validationResult(request);
  if (errors.isEmpty()) {
    return next();
  }
  return response.status(422).json({ errors: errors.array() });
};

module.exports = {
  findItem,
  hasItemId,
  isItem,
  isNewItem,
  sanitizeRequest,
  validateRequest
};
