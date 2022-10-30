const { bot } = require("../connections/token.connection");
const User = require("./../../models/userModel");

module.exports = bot.command("next", async (ctx) => {
  try {
    // -------------------------------------------------------------------------
    const user = await User.findOne({ chat_id: ctx.chat.id });

    User.findOneAndUpdate(
      { chat_id: user.chat_id },
      {
        status: "waiting",
        partner: null,
      }
    )
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });

    User.findOneAndUpdate(
      { chat_id: user.partner },
      {
        status: "waiting",
        partner: null,
      }
    )
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });

    // -------------------------------------------------------------------------

    // Finding partner to chat for user
    await ctx.reply("<b>Suhbatdosh qidirilmoqda . . .</b>", {
      parse_mode: "HTML",
    });
    let data;
    const findPartner = setInterval(async () => {
      try {
        data = (await User.findOne({ chat_id: user.chat_id })).partner;
        // console.log(data);
        if (!data) {
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
  } catch (err) {
    console.error(err);
  }
});
