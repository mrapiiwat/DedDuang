import { Router } from "express";
import * as userController from "../controller/user.controller";
import authorizeAdmin from "../../../common/middleware/authorizeAdmin";
import { upload } from "../../../common/middleware/upload";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - dateOfBirth
 *         - sex
 *         - status
 *       properties:
 *         name:
 *           type: string
 *           example: "John Doe"
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           example: "1990-01-01"
 *         timeOfBirth:
 *           type: string
 *           example: "12:00"
 *         image:
 *           type: string
 *           example: "john-doe.jpg"
 *         sex:
 *           type: string
 *           enum: ["ชาย", "หญิง"]
 *           example: "ชาย"
 *         status:
 *           type: string
 *           enum: ["มีคู่", "โสด"]
 *           example: "โสด"
 */
router.get("/user/:id", userController.getUserById);
/**
 * @swagger
 * paths:
 *   /api/user/{id}:
 *     get:
 *       summary: Get user by ID
 *       description: Retrieves a user by their ID.
 *       tags: [User]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the user to retrieve
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successfully retrieved user
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         '404':
 *           description: User not found
 *         '500':
 *           description: Internal server error
 */
router.put("/user/:id", upload.single("image"), userController.updateUserById);
/**
 * @swagger
 * paths:
 *   /api/user/{id}:
 *     put:
 *       summary: Update user by ID
 *       description: Updates a user by their ID.
 *       tags: [User]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the user to update
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '200':
 *           description: Successfully updated user
 *         '400':
 *           description: Invalid input data
 *         '404':
 *           description: User not found
 *         '500':
 *           description: Internal server error
 */
router.delete("/user/:id", authorizeAdmin, userController.deleteUserById);
/**
 * @swagger
 * paths:
 *   /api/user/{id}:
 *     delete:
 *       summary: Delete user by ID
 *       description: Deletes a user by their ID.
 *       tags: [User]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the user to delete
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successfully deleted user
 *         '404':
 *           description: User not found
 *         '500':
 *           description: Internal server error
 */

export default router;
