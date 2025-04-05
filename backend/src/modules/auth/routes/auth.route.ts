import { Router } from "express";
import * as authController from "../controller/auth.controller";
import { upload } from "../../../common/middleware/upload";
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *           example: user@example.com
 *         password:
 *           type: string
 *           description: The user's password
 *           example: password123
 *     Register:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - sex
 *         - status
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           description: The user's password
 *           example: "password123"
 *         name:
 *           type: string
 *           description: The user's name
 *           example: "John Doe"
 *         dateOfBirth:
 *           type: string
 *           description: The user's date of birth in YYYY-MM-DD format
 *           example: "1990-05-01"
 *         timeOfBirth:
 *           type: string
 *           description: The user's time of birth (optional)
 *           example: "08:30"
 *         sex:
 *           type: string
 *           enum: ["ชาย", "หญิง"]
 *           description: The user's sex
 *           example: "ชาย"
 *         status:
 *           type: string
 *           enum: ["มีคู่", "โสด"]
 *           description: The user's relationship status
 *           example: "โสด"
 *         role:
 *           type: string
 *           enum: ["ADMIN", "USER"]
 *           description: The user's role (optional)
 *           example: "USER"
 */
router.post("/register", upload.single("image"), authController.register);
/**
 * @swagger
 * paths:
 *   /api/register:
 *     post:
 *       summary: Register a new user
 *       description: Creates a new user in the database with the given data.
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/Register'
 *       responses:
 *         '201':
 *           description: Successfully created a new user
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "User Created Successfully"
 *         '400':
 *           description: Bad request due to invalid data
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         message:
 *                           type: string
 *                           example: "Email is required"
 *         '409':
 *           description: Conflict - Email already exists
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Email already exists"
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Internal server error"
 */
router.post("/login", authController.login);
/**
 * @swagger
 * paths:
 *   /api/login:
 *     post:
 *       summary: User login
 *       description: Authenticates a user and returns a JWT token for future requests.
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       responses:
 *         '200':
 *           description: Successful login, returns a JWT token
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Login successful. Welcome back, user@example.com!"
 *                   token:
 *                     type: string
 *                     description: The JWT token
 *                     example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         '400':
 *           description: Bad request due to invalid data
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: "Invalid email or password"
 *         '401':
 *           description: Unauthorized - Invalid credentials
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Invalid email or password"
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Internal server error"
 */
router.get("/logout", authController.logout);
/**
 * @swagger
 * paths:
 *   /api/logout:
 *     get:
 *       summary: User logout
 *       description: Clears the JWT token from the user's cookies.
 *       tags: [Auth]
 *       responses:
 *         '200':
 *           description: Successfully logged out
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Logout successful"
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Internal server error"
 */

export default router;
