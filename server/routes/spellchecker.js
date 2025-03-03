const express = require("express");
const Spellchecker = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

Spellchecker.post("/", async (req, res) => {
  const { sentence } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Correcting how the request is made
    const result = await model.generateContent(
      "Correct the spelling mistakes in this sentence and return only the corrected version:\n" +
        sentence
    );

    // Extract text correctly
    const responseText =
      result.response.candidates[0]?.content?.parts[0]?.text ||
      "No response generated";

    // result.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
    // "No response received";

    res.status(200).json({ correctedText: responseText });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = Spellchecker;
