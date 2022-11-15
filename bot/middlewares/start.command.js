const { bot } = require("../connections/token.connection");
const User = require("./../../models/userModel");

module.exports = bot.command("start", async (ctx) => {
  try {
    let user = await User.findOne({ chat_id: ctx.chat.id });
    if (!user) {
      const data = {
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name || null,
        username: ctx.from.username || null,
        chat_id: ctx.chat.id,
      };
      user = await User.create(data);
      if (!user) console.error("User not created");
    }
    ctx.reply(
      `<b>Salom ${user.first_name}!</b> \nChat Botga xush kelibsiz.\nSuhbatdan rohatlaning!`,
      { parse_mode: "HTML" }
    );
  } catch (err) {
    console.error(err);
  }
});
