console.log("Server started file execution");

import express from "express";
import OpenAI from "openai";
import "dotenv/config";

// Creating Express App
const app = express();
const PORT = 3000;

// Middleware that converts frontend JSON data to JS object
app.use(express.json());

// Allows backend to serve frontend files
app.use(express.static("public"));

// Creating OpenAI Client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Creating API Route
app.post("/explain", async (req, res) => {
  try {
    // Extracting the code sent from the frontend JSON
    const { code } = req.body;

    const prompt = `Think that I am a beginner and explain the following code in simple terms:\n\n${code}`;

    // Call OpenAI (NEW API – v6)
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    // Send AI's explanation back to frontend as JSON
    res.json({
      explanation: response.output_text,
    });
  } catch (error) {
    console.error("OpenAI Error:", error.message);
    res.status(500).json({
      explanation: "Error generating explanation",
    });
  }
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
