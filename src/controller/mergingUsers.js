const User = require("../../models/userModel");

const merging = (chatId_1, chatId_2) => {
  User.findOneAndUpdate(
    { chat_id: chatId_1 },
    {
      status: "chatting",
      partner: chatId_2,
    }
  )
    .then()
    .catch((err) => {
      console.error(err);
    });

  User.findOneAndUpdate(
    { chat_id: chatId_2 },
    {
      status: "chatting",
      partner: chatId_1,
    }
  )
    .then()
    .catch((err) => {
      console.error(err);
    });
};

module.exports = setInterval(async () => {
  try {
    let data = await User.find({ status: "waiting" });
    if (data.length > 1) {
      for (let i = 0, j = data.length - 1; i <= data.length / 2 - 1; i++, j--) {
        merging(data[i]["chat_id"], data[j]["chat_id"]);
      }
    }
  } catch (error) {
    console.error(error);
  }
}, 2000);
