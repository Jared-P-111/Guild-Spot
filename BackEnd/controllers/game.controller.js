const Game = require('../models/game.model.js');

//Utility for terminal
const showAll = async () => {
  const allGames = await Game.find();
  console.log(allGames);
};

const create = (req, res) => {
  Game.create(req.body)
    .then((game) => {
      showAll();
      res.status(201).json(game);
    })
    .catch((err) => res.status(400).json(err));
};

const findAll = (req, res) => {
  Game.find(req.body)
    .then((game) => {
      showAll();
      res.status(200).json(game);
    })
    .catch((err) => res.status(400).json(err));
};

const findOne = (req, res) => {
  const { id } = req.params;
  Game.findById(id)
    .then((game) => {
      res.status(200).json(game);
    })
    .catch((err) => console.log(err));
};

const updateOne = (req, res) => {
  const { id } = req.params;
  Game.findByIdAndUpdate(id, req.body)
    .then((game) => res.status(200).json(game))
    .catch((err) => res.status(400).json(err));
};

const deleteById = (req, res) => {
  const { id } = req.params;
  Game.findByIdAndDelete(id)
    .then((game) => {
      res.status(200).json(game);
    })
    .catch((err) => res.status(400).json(err));
};

const findOneGamesUsers = (req, res) => {
  const { id } = req.params;
  Game.findById(id)
    .populate('users')
    .then((game) => {
      res.status(200).json({ gameName: game.gameName, users: game.users });
    })
    .catch((err) => res.status(400).json(err));
};

const findOneGamesGuilds = (req, res) => {
  const { id } = req.params;
  Game.findById(id)
    .populate('guilds')
    .then((guild) => {
      res.status(200).json({ name: guild.name, memberCount: guild.users });
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  create,
  findOne,
  findAll,
  updateOne,
  deleteById,
  findOneGamesUsers,
  findOneGamesGuilds,
};
