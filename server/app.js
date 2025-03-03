require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Analysrouter = require("./routes/analysis");
const Spellchecker = require("./routes/spellchecker");
const Grammarchecker = require("./routes/grammarchecker");
const app = express();
const PORT = process.env.PORT || 3000;
Grammarchecker;
Analysrouter;
Spellchecker;

//* https://api.openai.com/v1/chat/completions
//! Middlewares
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use("/api/analys", Analysrouter);
app.use("/api/spellchecker", Spellchecker);
app.use("/api/grammerchecker", Grammarchecker);
app.listen(PORT, () => {
  console.log(`server is runnnig in ${PORT}`);
});
