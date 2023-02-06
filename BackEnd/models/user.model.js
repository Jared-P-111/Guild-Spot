const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: String,
    password: String,
    userCharacters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User Characters',
      },
    ],
    userGuild: {
      type: Schema.Types.ObjectId,
      ref: 'User Guild',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
