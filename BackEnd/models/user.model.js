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
        ref: 'Character',
      },
    ],
    guildId: Schema.Types.ObjectId,
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (email, password, userName) {
  //🧈Validation
  if (!email || !password || !userName) {
    throw Error('All fields need to be filled');
  }
  if (userName.length < 3) {
    throw Error('User Name must be 3 characters or more');
  }
  if (!validator.isEmail(email)) {
    throw Error('All fields must be appropriate EMAIL');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('All fields must be appropriate PASSWORD');
  }

  //🧈Check if email in use.
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error('All fields must be appropriate EMAIL IN USE');
  }

  //🧈Check if user name in use.
  const userExists = await this.findOne({ userName });
  if (userExists) {
    throw Error('All fields must be appropriate USERNAME IN USE');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //🧈Create User and send back
  const user = await this.create({ email, password: hash, userName });

  return user;
};

userSchema.statics.login = async function (email, password) {
  //🧈Validation
  if (!email || !password) {
    throw Error('Invalid Credentials: ');
  }

  //🧈Check if email in use.
  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Invalid Credentials: USER NOT FOUND');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Invalid Credentials: PASS not matching');
  }

  return user;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
