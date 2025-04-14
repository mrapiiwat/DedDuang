import { Router } from "express";
import authorizeAdmin from "../../../common/middleware/authorizeAdmin";
import * as itemController from "../controller/item.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - image
 *         - categoryId
 *       properties:
 *         name:
 *           type: string
 *           example: "Facial Cleanser"
 *         description:
 *           type: string
 *           example: "Deep cleansing facial foam for oily skin"
 *         image:
 *           type: string
 *           example: "https://example.com/image.jpg"
 *         categoryId:
 *           type: string
 *           example: "1"
 */
router.get("/item", itemController.getAllItems);
/**
 * @swagger
 * /api/item:
 *   get:
 *     summary: Get all items
 *     description: Retrieve all items
 *     tags: [Item]
 *     responses:
 *       200:
 *         description: Items fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Item'
 */
router.post("/item", authorizeAdmin, itemController.createItem);
/**
 * @swagger
 * /api/item:
 *   post:
 *     summary: Create a new item
 *     description: Only admins can create a new item
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Bad request (validation error)
 *       500:
 *         description: Internal server error
 */
router.get("/item/:id", itemController.getItemById);
/**
 * @swagger
 * /api/item/{id}:
 *   get:
 *     summary: Get item by ID
 *     tags: [Item]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
router.put("/item/:id", authorizeAdmin, itemController.updateItem);
/**
 * @swagger
 * /api/item/{id}:
 *   put:
 *     summary: Update an item by ID
 *     description: Only admins can update an item
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
router.delete("/item/:id", authorizeAdmin, itemController.deleteItem);
/**
 * @swagger
 * /api/item/{id}:
 *   delete:
 *     summary: Delete item by ID
 *     description: Only admins can delete an item
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */

export default router;
