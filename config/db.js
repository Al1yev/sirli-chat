const mongoose = require("mongoose");
require("dotenv").config();

module.exports = mongoose.connect(process.env.DB_LINK, (err) =>
  err ? console.log("DB connection error: \n") : console.log("DB connected")
);
