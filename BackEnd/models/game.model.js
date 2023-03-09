const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    gameName: String,
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    guilds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Guild',
      },
    ],
  },
  { timestamps: true }
);

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
