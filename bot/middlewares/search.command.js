const { bot } = require("../connections/token.connection");
const User = require("../../models/userModel");

module.exports = bot.command("search", async (ctx) => {
  try {
    let user = await User.findOne({ chat_id: ctx.chat.id });

    if (user.status == "active") {
      User.findOneAndUpdate({ chat_id: user.chat_id }, { status: "waiting" })
        .then((res) => {})
        .catch((err) => {
          console.error(err);
        });

      // -------------------------------------------------------------------------

      // Finding partner to chat for user
      await ctx.reply("<b>Suhbatdosh qidirilmoqda . . .</b>", {
        parse_mode: "HTML",
      });

      setTimeout(async () => {
        await ctx.reply(
          "<b>Suhbatdosh topilmadi!</b> \n\nYana bir bor urinib ko'ring",
          { parse_mode: "HTML" }
        );
        User.findOneAndUpdate({ chat_id: user.chat_id }, { status: "active" })
          .then((res) => {})
          .catch((err) => {
            console.error(err);
          });
        clearInterval(findPartner);
      }, 60000);

      let data;

      const findPartner = setInterval(async () => {
        // --------------------------------------------------------------------------
        try {
          data = (await User.findOne({ chat_id: user.chat_id })).partner;
          if (data) {
            await ctx.reply(
              "<b>Suhbatdosh topildi</b> \n\n/next - boshqa suhbatdoshga o'tish; \n/stop - suhbatni to'xtatish;",
              { parse_mode: "HTML" }
            );
            return clearInterval(findPartner);
          }
        } catch (err) {
          console.log(err);
        }
      }, 1000);

      // -------------------------------------------------------------------------
    } else if (user.status == "chatting") {
      ctx.reply(
        "<b>Siz ayni paytda chatdasiz!</b> \n\n/next - yangi suhbatdosh qidirish uchun",
        { parse_mode: "HTML" }
      );
    }
  } catch (error) {
    console.error(error);
  }
});
