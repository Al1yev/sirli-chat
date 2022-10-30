const { bot } = require("./../connections/token.connection");
const User = require("../../models/userModel");

module.exports = bot.on("message", async (ctx) => {
  try {
    let user = await User.findOne({ chat_id: ctx.chat.id });
    if (user.status == "chatting") {
      await bot.api.copyMessage(
        user.partner,
        user.chat_id,
        ctx.update.message.message_id
      );
    } else {
      await ctx.reply(
        "<b>Sizda hozirda faol chat mavjud emas!</b> \n\n/search - Suhbatdosh qidirishi uchun",
        { parse_mode: "HTML" }
      );
    }
  } catch (error) {
    console.error(error);
  }
});
