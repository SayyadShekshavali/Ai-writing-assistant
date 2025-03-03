const express = require("express");
const Grammarchecker = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

Grammarchecker.post("/", async (req, res) => {
  const { sentence } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Correcting the request format
    const result = await model.generateContent(
      `Correct the Grammar mistakes in this sentence and return only the corrected version:\n"${sentence}"`
    );

    // Extract response properly
    const responseText =
      result.response.candidates[0]?.content?.parts[0]?.text ||
      "No response generated";

    if (!responseText) {
      throw new Error("No valid response received from Gemini API");
    }

    res.status(200).json({ correctedText: responseText });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = Grammarchecker;
