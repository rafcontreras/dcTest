const { Router } = require("express");
const {
  createItem,
  deleteItem,
  getItems,
  getItem,
  updateItem
} = require("../controllers");

const {
  findItem,
  hasItemId,
  isItem,
  isNewItem,
  sanitizeRequest,
  validateRequest
} = require("../validators");

const router = Router();

router.get("/*", (req, res, next) => {
  next();
});

router.post(
  "/api/v1/shopping-list/item",
  sanitizeRequest,
  isNewItem(),
  validateRequest,
  createItem
);

router.get("/api/v1/shopping-list", validateRequest, getItems);

router.put(
  "/api/v1/shopping-list/item/:itemId",
  sanitizeRequest,
  hasItemId(),
  isItem(),
  validateRequest,
  findItem,
  updateItem
);

router.get(
  "/api/v1/shopping-list/item/:itemId",
  sanitizeRequest,
  hasItemId(),
  validateRequest,
  getItem
);

router.delete(
  "/api/v1/shopping-list/item/:itemId",
  sanitizeRequest,
  hasItemId(),
  validateRequest,
  findItem,
  deleteItem
);

module.exports = router;
