const Character = require('../models/character.model');
const User = require('../models/user.model.js');

//Utility for terminal
const showAll = async () => {
  const allCharacter = await Character.find();
  console.log(allCharacter);
};

//create new character
const create = async (req, res) => {
  const { userId, name } = req.body;
  try {
    const character = await Character.create(req.body);
    const checkUser = await User.findById(userId);
    console.log(`Conditional Check ------> : ${checkUser.characterNames.includes(name)}`);

    if (checkUser.characterNames.includes(name)) {
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { userCharacters: character._id } },
        { $push: { characterNames: { name: name, userId: userId } } },
        { new: true }
      );
      console.log(`User ==============> : ${user}`);
      res.status(200).json({ character, user });
    } else {
      return res.status(400).json({ error: 'That character name in use' });
    }
  } catch (error) {
    res.status(400).json({ CatchBlockerror: error.message });
  }
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
