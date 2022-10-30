require("dotenv").config();

// CONNECTION TO DB
require("../config/db");

const { bot } = require("./connections/token.connection");

bot.api.setMyCommands([
  { command: "start", description: "✨Botni ishga tushirish" },
  { command: "help", description: "⚙Yordam" },
  { command: "search", description: "🎎Yangi suhbatdosh qidirish" },
  { command: "stop", description: "🪓Suhbatni to'xtatish" },
  { command: "next", description: "🕹Keyingi suhbatdoshga o'tish" },
]);

// COMMANDS

require("./middlewares/start.command");
require("./middlewares/search.command");
require("./middlewares/stop.command");
require("./middlewares/next.command");
require("./middlewares/help.command");

require("./middlewares/message.command");

// ----------------------------------------

// Bot START
require("./connections/local.connection");
// ----------------------------------------
