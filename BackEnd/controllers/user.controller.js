const Guild = require('../models/guild.model');
const Game = require('../models/game.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

//🌮Utility for terminal
const showAll = async () => {
  const allCharacters = await User.find();
  console.log(allCharacters);
};

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

  try {
    const user = await User.signup(email, password, userName);

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

const joinGame = async (req, res) => {
  const { gameId, userId } = req.body;

  const getGame = await Game.findById(gameId);
  const currGameUsers = getGame.users;
  if (!currGameUsers.includes(userId)) {
    gameUpdate = { $push: { users: userId } };
  } else {
    return res.status(400).json({ error: 'That user is already subscribed to this game' });
  }

  //🌮Check the games array in the user if userId is there or not
  const getUser = await User.findById(userId);
  const currUserGames = getUser.games;
  if (!currUserGames.includes(gameId)) {
    userUpdate = { $push: { games: gameId } };
  } else {
    return res.status(400).json({ error: 'That game already has this user' });
  }

  const game = await Game.findByIdAndUpdate(gameId, gameUpdate, { new: true });
  const user = await User.findByIdAndUpdate(userId, userUpdate, { new: true });

  res.status(200).json({ game, user });
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

module.exports = {
  findAll,
  joinGuild,
  joinGame,
  leaveGuild,
  deleteUserById,
  signupUser,
  loginUser,
};
