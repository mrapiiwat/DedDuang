import { Router, Request, Response } from "express";
import { chatWithAI } from "../../../common/config/openai";
import { z, ZodError } from "zod";

const router = Router();

// Define the schema for the request body
const chatRequestSchema = z.object({
  messages: z.string().nonempty("Messages cannot be empty"),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     ChatRequest:
 *       type: object
 *       required:
 *         - messages
 *       properties:
 *         messages:
 *           type: string
 *           example: "Tell me something about skincare"
 *     ChatResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "chatcmpl-abc123"
 *         object:
 *           type: string
 *           example: "chat.completion"
 *         created:
 *           type: integer
 *           example: 1712920000
 *         choices:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: object
 *                 properties:
 *                   role:
 *                     type: string
 *                     example: assistant
 *                   content:
 *                     type: string
 *                     example: "Sure! Here's a quick tip for skincare..."
 *         usage:
 *           type: object
 *           properties:
 *             prompt_tokens:
 *               type: integer
 *             completion_tokens:
 *               type: integer
 *             total_tokens:
 *               type: integer
 */

/**
 * @swagger
 * /api/openai/chat:
 *   post:
 *     summary: Chat with AI
 *     description: Sends a message to the AI and receives a response.
 *     tags: [OpenAI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatRequest'
 *     responses:
 *       200:
 *         description: AI response successfully returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: Messages cannot be empty
 *       500:
 *         description: Internal server error
 */
router.post("/openai/chat", async (req: Request, res: Response) => {
  try {
    const parsedBody = chatRequestSchema.parse(req.body);
    const response = await chatWithAI(parsedBody.messages);
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
    } else if (error instanceof Error) {
      console.error("Error in /openai/chat:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.error("Error in /openai/chat:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

export default router;
