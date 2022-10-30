const express = require("express");
const app = express();

require("dotenv").config();

require("../config/db");

require("./controller/mergingUsers");

app.listen(process.env.PORT || 1234, (err) =>
  err ? console.error(err) : console.log("Server is listening")
);
