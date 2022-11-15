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

      // -------------------------------------------------------------------------

      await bot.api.sendMessage(
        user.partner,
        "<b>Sizning suhbatdoshingiz suhbatni to'xtatdi</b> \n\n /search - Yangi suhbatdosh topish uchun",
        { parse_mode: "HTML" }
      );

      await ctx.reply("<b>Suhbat to'xtatildi</b>", {
        parse_mode: "HTML",
      });
    }

    // Finding partner to chat for user

    await ctx.reply("<b>Suhbatdosh qidirilmoqda . . .</b>", {
      parse_mode: "HTML",
    });
    let data;
    setTimeout(async () => {
      if (!data) {
        try {
          await ctx.reply(
            "<b>Suhbatdosh topilmadi!</b>\n\nAyni paytda bot foydalanuvchilari soni kamligi tufayli sizga suhbatdosh topilmadi. Noqulaylikar uchun uzr so'raymiz!\n<i>Botimzning foydalanuvchilari sonini oshirishga yordam bersangiz juda minnador bo'lar edik</i>",
            { parse_mode: "HTML" }
          );
          await ctx.reply("<b>Yana bir bor urinib ko'ring!</b>", {
            parse_mode: "HTML",
          });
        } catch (err) {
          if (err.error_code == 403) {
            User.findOneAndUpdate(
              { chat_id: user.chat_id },
              { status: "inactive" }
            )
              .then((res) => {})
              .catch((err) => {
                console.error(err);
              });
          }
        }
        User.findOneAndUpdate({ chat_id: user.chat_id }, { status: "active" })
          .then((res) => {})
          .catch((err) => {
            console.error(err);
          });
        clearInterval(findPartner);
      }
    }, 60000);
    const findPartner = setInterval(async () => {
      try {
        data = (await User.findOne({ chat_id: user.chat_id })).partner;
        // console.log(data);
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
  } catch (err) {
    if (err.error_code == 403) {
      User.findOneAndUpdate(
        { chat_id: user.chat_id },
        { status: "inactive", partner: null }
      )
        .then((res) => {})
        .catch((err) => {
          console.error(err);
        });
      User.findOneAndUpdate(
        { chat_id: user.partner },
        { status: "inactive", partner: null }
      )
        .then((res) => {})
        .catch((err) => {
          console.error(err);
        });
    }
  }
});
