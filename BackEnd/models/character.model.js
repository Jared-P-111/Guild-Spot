const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema(
  {
    name: String,
    guild: {
      type: Schema.Types.ObjectId,
      ref: 'Guild',
    },
  },
  { timestamps: true }
);

const Character = mongoose.model('Character', characterSchema);
module.exports = Character;
