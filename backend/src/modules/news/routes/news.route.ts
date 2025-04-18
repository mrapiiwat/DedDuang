import { Router } from "express";
import authorizeAdmin from "../../../common/middleware/authorizeAdmin";
import * as newsController from "../controller/news.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - title
 *         - url
 *         - imageUrl
 *       properties:
 *         title:
 *           type: string
 *           example: "Sample News Title"
 *         url:
 *           type: string
 *           example: "https://example.com/news"
 *         imageUrl:
 *           type: string
 *           example: "https://example.com/news-image.jpg"
 */
router.get("/news", newsController.getNews);
/**
 * @swagger
 * paths:
 *   /api/news:
 *     get:
 *       summary: Get all news articles
 *       description: Retrieves a paginated list of news articles from the database.
 *       tags: [News]
 *       parameters:
 *         - name: page
 *           in: query
 *           required: false
 *           description: The page number for pagination
 *           schema:
 *             type: integer
 *             default: 1
 *         - name: limit
 *           in: query
 *           required: false
 *           description: The number of news articles per page
 *           schema:
 *             type: integer
 *             default: 10
 *       responses:
 *         '200':
 *           description: Successfully retrieved the list of news articles
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/News'
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Something went wrong"
 */
router.get("/news/all", newsController.getAllnews);
/**
 * @swagger
 * paths:
 *   /api/news/all:
 *     get:
 *       summary: Get all news articles without pagination
 *       description: Retrieves all news articles from the database without pagination.
 *       tags: [News]
 *       responses:
 *         '200':
 *           description: Successfully retrieved the list of news articles
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/News'
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Something went wrong"
 */
router.post("/news", authorizeAdmin, newsController.createNews);
/**
 * @swagger
 * paths:
 *   /api/news:
 *     post:
 *       summary: Create a new news article
 *       description: Creates a new news article in the database
 *       tags: [News]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       responses:
 *         '201':
 *           description: Successfully created a new news article
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/News'
 *         '401':
 *           description: Unauthorized - Admin role is required
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Unauthorized"
 *         '403':
 *           description: Forbidden - Admin role is required
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Forbidden: Admins only"
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
 *                           example: "title is required"
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Something went wrong"
 */
router.delete("/news/:id", authorizeAdmin, newsController.deleteNews);
/**
 * @swagger
 * paths:
 *   /api/news:
 *     delete:
 *       summary: Delete a news article
 *       description: Deletes a news article by ID.
 *       tags: [News]
 *       parameters:
 *         - name: id
 *           in: query
 *           required: true
 *           description: The ID of the news article to delete
 *           schema:
 *             type: string
 *       responses:
 *         '204':
 *           description: News article deleted successfully
 *         '401':
 *           description: Unauthorized - Admin role is required
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Unauthorized"
 *         '403':
 *           description: Forbidden - Admin role is required
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Forbidden: Admins only"
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Something went wrong"
 */
router.put("/news/:id", authorizeAdmin, newsController.updateNews);
/**
 * @swagger
 * paths:
 *   /api/news/{id}:
 *     put:
 *       summary: Update a news article
 *       description: Updates an existing news article by ID.
 *       tags: [News]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the news article to update
 *           schema:
 *             type: string
 *         - name: News
 *           in: body
 *           required: true
 *           description: The updated news article data
 *           schema:
 *             $ref: '#/components/schemas/News'
 *       responses:
 *         '200':
 *           description: News article updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/News'
 *         '401':
 *           description: Unauthorized - Admin role is required
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Unauthorized"
 */


export default router;
