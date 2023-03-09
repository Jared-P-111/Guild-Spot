const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema(
  {
    name: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Character = mongoose.model('Character', characterSchema);
module.exports = Character;
