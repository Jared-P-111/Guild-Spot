//Bring in the controllers
const {
  create,
  findOne,
  findAll,
  updateOne,
  deleteById,
  findOneGuildsCharacters,
} = require('../controllers/guild.controller.js');

//Bring in express to attach our routes
const express = require('express');

//Instantiate our Router for the project
const guildRouter = express.Router();

//--------------- App Routes --------------------
//Here we take in the /api/ name space with productRouter and append /message

//prettier-ignore
guildRouter
  .route('/')
  .post(create)
  .get(findAll)

//prettier-ignore
guildRouter
  .route('/:id')
  .get(findOne)
  .put(updateOne)
  .delete(deleteById);

//prettier-ignore
guildRouter
  .route('/:id/guildCharacters')
  .get(findOneGuildsCharacters)

//export the projects Router
module.exports = guildRouter;
