const { bot } = require("./../connections/token.connection");
const User = require("../../models/userModel");

module.exports = bot.command("help", async (ctx) => {
  try {
    await ctx.reply(`Bu bot orqali siz o'zingizni shaxiyatingizno hech kimga bildirmagan holda boshqa notanishlar bilan bemalol suhbatlashishingiz mumkin
    <b>Bu botda ishlash:</b>
    \n/search - Yangi suhbatdosh qidirish uchun
    \n/next - Hozirgi suhbatni yakunlab, boshqa suhbatdosh qidirish
    \n/stop - Hozirgi suhbatni to'xtatish

    <u>Suhbatlashing va rohatlaning!</u>
    `);
  } catch (error) {
    console.error(error);
  }
});
