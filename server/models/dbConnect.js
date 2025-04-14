const moongose = require("mongoose");
require("dotenv").config();
const DB_URL = process.env.MDB_URL;

moongose
  .connect(DB_URL)
  .then(() => {
    console.log("mongoDB is connected");
  })
  .catch((err) => {
    console.log("Error while mongoDB connect:", err);
  });
