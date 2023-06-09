const { Schema, model } = require("mongoose");
const moment = require("moment");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: "Username is Required!",
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: "Email is Required!",
      match: /.+\@.+\..+/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
