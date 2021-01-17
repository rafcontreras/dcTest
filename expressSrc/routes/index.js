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

/**
 * @swagger
 * /:
 *   get:
 *     description: Returns the homepage
 *     responses:
 *       200:
 *         description: Homepage for the Shopping List
 *       404:
 *         description: Not found
 */
router.get("/*", (request, response, next) => {
  next();
});

/**
 * @swagger
 * /api/v1/shopping-list:
 *   get:
 *     summary: Retrieve a shopping list.
 *     description: Retrieve a shopping list of items. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of shopping items.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Items'
 *       404:
 *         description: Not found
 *       422:
 *         description: Bad request
 */
router.get("/api/v1/shopping-list", validateRequest, getItems);

/**
 * @swagger
 * /api/v1/shopping-list/item:
 *   post:
 *     summary: Create a shopping list item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewItem'
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/title'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemsAndItem'
 *       404:
 *         description: Not found
 *       422:
 *         description: Bad request
 */
router.post(
  "/api/v1/shopping-list/item",
  sanitizeRequest,
  isNewItem(),
  validateRequest,
  createItem
);

/**
 * @swagger
 * /api/v1/shopping-list/item/{itemId}:
 *   put:
 *     summary: Edit a shopping list item.
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         description: Unique Id of item to retrieve.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Modified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemsAndItem'
 *       404:
 *         description: Not found
 *       422:
 *         description: Bad request
 */
router.put(
  "/api/v1/shopping-list/item/:itemId",
  sanitizeRequest,
  hasItemId(),
  isItem(),
  validateRequest,
  findItem,
  updateItem
);

/**
 * @swagger
 * /api/v1/shopping-list/item/{itemId}:
 *   get:
 *     summary: Get a shopping list item.
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         description: Unique Id of item to retrieve.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Not found
 *       422:
 *         description: Bad request
 */
router.get(
  "/api/v1/shopping-list/item/:itemId",
  sanitizeRequest,
  hasItemId(),
  validateRequest,
  getItem
);

/**
 * @swagger
 * /api/v1/shopping-list/item/{itemId}:
 *   delete:
 *     summary: Remove a shopping list item.
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         description: Unique Id of item to retrieve.
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemsAndItem'
 *       404:
 *         description: Not found
 *       422:
 *         description: Bad request
 */
router.delete(
  "/api/v1/shopping-list/item/:itemId",
  sanitizeRequest,
  hasItemId(),
  validateRequest,
  findItem,
  deleteItem
);

module.exports = router;
