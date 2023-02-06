const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guildSchema = new Schema(
  {
    name: String,
    memberCount: Number,
    characters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Character',
      },
    ],
  },
  { timestamps: true }
);

const Guild = mongoose.model('Guild', guildSchema);
module.exports = Guild;
