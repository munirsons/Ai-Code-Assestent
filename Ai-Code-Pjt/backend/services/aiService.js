import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Function for analyzing code
export const analyzeCode = async (code) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or gpt-4o
      messages: [
        {
          role: "system",
          content: "You are an expert AI code reviewer and bug fixer.",
        },
        {
          role: "user",
          content: `Analyze this code and find all possible bugs or issues:\n\n${code}`,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error analyzing code:", error);
    return "⚠️ Failed to analyze code. Please check your API key or network.";
  }
};

// ✅ Function for AI Chat
export const handleAiChat = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ reply: "Prompt is required." });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: prompt },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ reply: "⚠️ Error connecting to AI service." });
  }
};
