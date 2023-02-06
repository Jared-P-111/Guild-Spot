const Guild = require('../models/guild.model');
const User = require('../models/user.model');

//Utility for terminal
const showAll = async () => {
  const allCharacters = await User.find();
  console.log(allCharacters);
};

const findAll = (req, res) => {
  User.find()
    .then((user) => {
      showAll();
      res.status(200).json(user);
    })
    .catch((err) => res.status(400).json(err));
};

const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => {
      showAll();
      res.status(201).json(user);
    })
    .catch((err) => res.status(400).json(err));
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
  const user = await User.findByIdAndUpdate(userId, { guildId: guildId }, { new: true });
  const guild = await Guild.findByIdAndUpdate(guildId, { $push: { users: userId } }, { new: true });
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

module.exports = { findAll, joinGuild, leaveGuild, createUser, deleteUserById };
