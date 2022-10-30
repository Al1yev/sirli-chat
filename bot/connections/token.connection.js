const { Bot } = require("grammy");
require("dotenv").config();

exports.bot = new Bot(process.env.BOT_TOKEN);
