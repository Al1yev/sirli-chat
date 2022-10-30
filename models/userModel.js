const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      default: null,
      // required: true,
    },
    username: {
      type: String,
      default: null,
      // required: true,
    },
    chat_id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "super_admin"],
    },
    status: {
      type: String,
      default: "active",
      enum: ["inactive", "active", "waiting", "chatting"],
    },
    partner: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function () {
  this.role = "user";
  this.status = "active";
});

module.exports = new mongoose.model("user", userSchema);
