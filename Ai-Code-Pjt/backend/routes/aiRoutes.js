import express from "express";
import { analyzeCode } from "../services/aiService.js";
import { handleAiChat } from "../services/aiService.js";



const router = express.Router();

router.post("/chat", handleAiChat);

router.post("/analyze", async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  const result = await analyzeCode(code);
  res.json({ result });
});

export default router;
