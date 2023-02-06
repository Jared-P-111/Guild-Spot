const Guild = require('../models/guild.model.js');

//Utility for terminal
const showAll = async () => {
  const allCharacters = await Guild.find();
  console.log(allCharacters);
};

const create = (req, res) => {
  Guild.create(req.body)
    .then((guild) => {
      showAll();
      res.status(201).json(guild);
    })
    .catch((err) => res.status(400).json(err));
};

const findAll = (req, res) => {
  Guild.find()
    .then((guild) => {
      showAll();
      res.status(200).json(guild);
    })
    .catch((err) => res.status(400).json(err));
};

const findOne = (req, res) => {
  const { id } = req.params;
  Guild.findById(id)
    .then((guild) => {
      res.status(200).json(guild);
    })
    .catch((err) => console.log(err));
};

const updateOne = (req, res) => {
  const { id } = req.params;
  Guild.findByIdAndUpdate(id, req.body)
    .then((guild) => res.status(200).json(guild))
    .catch((err) => res.status(400).json(err));
};

const deleteById = (req, res) => {
  const { id } = req.params;
  Guild.findByIdAndDelete(id)
    .then((guild) => {
      res.status(200).json(guild);
    })
    .catch((err) => res.status(400).json(err));
};

const findOneGuildsCharacters = (req, res) => {
  const { id } = req.params;
  Guild.findById(id)
    .populate('characters')
    .then((guild) => {
      res.status(200).json({ 'Guild Name': guild.name, characters: guild.characters });
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = { create, findOne, findAll, updateOne, deleteById, findOneGuildsCharacters };
