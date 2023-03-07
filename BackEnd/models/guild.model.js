const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guildSchema = new Schema(
  {
    name: String,
    memberCount: Number,
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const Guild = mongoose.model('Guild', guildSchema);
module.exports = Guild;
