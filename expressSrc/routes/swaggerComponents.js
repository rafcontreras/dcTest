/**
 * @swagger
 * components:
 *   schemas:
 *     Items:
 *       type: object
 *       description: Shopping list
 *       properties:
 *         items:
 *           type: array
 *           description: The shopping list item title.
 *           items:
 *             $ref: '#/components/schemas/Item'
 *     NewItem:
 *       type: object
 *       description: Shopping list item
 *       properties:
 *         title:
 *           type: string
 *           description: The shopping list item title.
 *           example: Milk
 *     Item:
 *       allOf:
 *         - type: object
 *           properties:
 *             itemId:
 *               type: string
 *               description: The item ID.
 *               example: 63293f2c-1086-4821-961b-8a08aaf2c74a
 *             completed:
 *               type: boolean
 *               description: The item has been completed or not.
 *               example: false
 *         - $ref: '#/components/schemas/NewItem'
 *     ItemsAndItem:
 *       type: object
 *       description: Shopping list
 *       properties:
 *         item:
 *           $ref: '#/components/schemas/Item'
 *       allOf:
 *         - type: object
 *         - $ref: '#/components/schemas/Items'
 */
