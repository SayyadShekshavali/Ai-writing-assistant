const express = require("express");
const Analysrouter = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

Analysrouter.post("/", async (req, res) => {
  const { sentence } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Correct way to send a single request
    const result = await model.generateContent(
      "Rephrase the following sentence into three different variations without any extratext only answer:\n\n" +
        sentence
    );

    // Extracting the response properly
    const responseText =
      result.response.candidates[0]?.content?.parts[0]?.text ||
      "No response generated";

    res.status(200).json({ rephrased: responseText });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = Analysrouter;
