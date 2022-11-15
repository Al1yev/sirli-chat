const { bot } = require("./../connections/token.connection");
const User = require("../../models/userModel");

module.exports = bot.command("help", async (ctx) => {
  try {
    await ctx.reply(
      `Bu bot orqali mutlaqo o'zligingizni hech kimga bildirmagan holda boshqa notanishlar bilan bemalol suhbatlashishingiz mumkin
    \n<b>Bu botda ishlash:</b>
    /search - Yangi suhbatdosh qidirish uchun
    /next - Hozirgi suhbatni yakunlab, boshqa suhbatdosh qidirish
    /stop - Hozirgi suhbatni to'xtatish

    <u>Suhbatlashing va rohatlaning!</u>
    `,
      { parse_mode: "HTML" }
    );
  } catch (error) {
    console.error(error);
  }
});
