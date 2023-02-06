const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: String,
    email: String,
    userCharacters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User Characters',
      },
    ],
    guildId: Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
