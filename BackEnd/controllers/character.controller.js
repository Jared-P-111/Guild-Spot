const Character = require('../models/character.model');

//Utility for terminal
const showAll = async () => {
  const allCharacter = await Character.find();
  console.log(allCharacter);
};

//create new character
const create = (req, res) => {
  Character.create(req.body)
    .then((character) => {
      showAll();
      res.status(201).json(character);
    })
    .catch((err) => res.status(400).json(err));
};

const findAll = (req, res) => {
  Character.find()
    .then((character) => {
      showAll();
      res.status(200).json(character);
    })
    .catch((err) => res.status(400).json(err));
};

const findOne = (req, res) => {
  const { id } = req.params;
  Character.findById(id)
    .then((character) => {
      res.status(200).json(character);
    })
    .catch((err) => console.log(err));
};

const updateOne = (req, res) => {
  const { id } = req.params;
  Character.findByIdAndUpdate(id, req.body)
    .then((character) => res.status(200).json(character))
    .catch((err) => res.status(400).json(err));
};

const deleteById = (req, res) => {
  const { id } = req.params;
  Character.findByIdAndDelete(id)
    .then((character) => {
      res.status(200).json(character);
    })
    .catch((err) => res.status(400).json(err));
};

const getCharacterGuild = (req, res) => {
  const { id } = req.params;
  Character.findById(id)
    .populate('guild')
    .then((character) => {
      res.status(200).json(character);
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  create,
  findAll,
  findOne,
  updateOne,
  deleteById,
  getCharacterGuild,
};
