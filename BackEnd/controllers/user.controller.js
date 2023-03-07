const Guild = require('../models/guild.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

//🌮Utility for terminal
const showAll = async () => {
  const allCharacters = await User.find();
  console.log(allCharacters);
};

//🌮create json web token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '10d' });
};

const findAll = (req, res) => {
  User.find()
    .then((user) => {
      showAll();
      res.status(200).json(user);
    })
    .catch((err) => res.status(400).json(err));
};

const signupUser = async (req, res) => {
  const { email, password, userName } = req.body;
  console.log(`Email: ${email} ---- Password: ${password}`);
  console.log(`User Name: ${userName}`);

  try {
    const user = await User.signup(email, password, userName);

    //🌮Create Token
    const token = createToken(user._id);
    res.status(200).json({ email, userName, token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //🌮Create Token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUserById = (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => res.status(400).json(err));
};

const joinGuild = async (req, res) => {
  const { userId } = req.body;
  const { guildId } = req.body;

  const getGuild = await Guild.findById(guildId);
  const currUsers = getGuild.users;
  let update = {};

  if (!currUsers.includes(userId)) {
    update = {
      $push: { users: userId },
      $set: { memberCount: currUsers.length + 1 },
    };
  } else {
    return res.status(400).json({ error: 'That user is already in this guild' });
  }

  const user = await User.findByIdAndUpdate(userId, { guildId: guildId }, { new: true });
  const guild = await Guild.findByIdAndUpdate(guildId, update, { new: true });

  res.status(200).json({ guild, user });
};

const leaveGuild = async (req, res) => {
  const { userId } = req.body;
  const { guildId } = req.body;
  try {
    const removedUser = await User.findByIdAndUpdate(userId, { guildId: null }, { new: true });
    const removedGuild = await Guild.findByIdAndUpdate(
      guildId,
      { $pull: { users: userId } },
      { new: true }
    );

    //prettier-ignore
    res
      .status(200)
      .json({ action: 'Removed Character from guild', removedUser, removedGuild });
  } catch (error) {
    //prettier-ignore
    res
      .status(400)
      .json({ error: error })
  }
};

module.exports = { findAll, joinGuild, leaveGuild, deleteUserById, signupUser, loginUser };
