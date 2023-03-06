const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
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

userSchema.statics.signup = async function (email, password) {
  //🧈Validation
  if (!email || !password) {
    throw Error('All fields need to be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('All fields must be appropriate EMAIL');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('All fields must be appropriate PASSWORD');
  }

  //🧈Check if email in use.
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error('All fields must be appropriate EMAIL IN USE');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
