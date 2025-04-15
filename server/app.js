require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Analysrouter = require("./routes/analysis.js");
const Spellchecker = require("./routes/spellchecker.js");
const Grammarchecker = require("./routes/grammarchecker.js");
const authRouter = require("./routes/authRouter.js");
const app = express();
require("./models/dbConnect.js");
const PORT = process.env.PORT || 3000;
Grammarchecker;
Analysrouter;
Spellchecker;

//! Middlewares
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use("/api/analys", Analysrouter);
app.use("/api/spellchecker", Spellchecker);
app.use("/api/grammerchecker", Grammarchecker);
app.use("/auth", authRouter);
app.listen(PORT, () => {
  console.log(`server is runnnig in ${PORT}`);
});
