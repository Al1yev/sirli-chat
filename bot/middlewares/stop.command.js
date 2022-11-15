const { bot } = require("./../connections/token.connection");
const User = require("../../models/userModel");

module.exports = bot.command("stop", async (ctx) => {
  try {
    let user = await User.findOne({ chat_id: ctx.chat.id });

    User.findOneAndUpdate(
      { chat_id: user.chat_id },
      {
        status: "active",
        partner: null,
      }
    )
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });

    if (user.partner) {
      User.findOneAndUpdate(
        { chat_id: user.partner },
        {
          status: "active",
          partner: null,
        }
      )
        .then((res) => {})
        .catch((err) => {
          console.error(err);
        });

      await bot.api.sendMessage(
        user.partner,
        "<b>Sizning suhbatdoshingiz suhbatni to'xtatdi</b> \n\n /search - Yangi suhbatdosh topish uchun",
        { parse_mode: "HTML" }
      );
    }

    await ctx.reply(
      "<b>Suhbat to'xtatildi!</b> \n\n /search - Yangi suhbatdosh topish uchun",
      { parse_mode: "HTMl" }
    );
  } catch (error) {
    console.error(error);
  }
});
