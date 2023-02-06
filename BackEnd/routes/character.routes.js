//Bring in the controllers
const {
  create,
  findOne,
  findAll,
  updateOne,
  deleteById,
  getCharacterGuild,
} = require('../controllers/character.controller.js');

//Bring in express to attach our routes
const express = require('express');

//Instantiate our Router for the project
const characterRouter = express.Router();

//prettier-ignore
characterRouter
  .route('/')
  .post(create)
  .get(findAll)

//prettier-ignore
characterRouter
  .route('/:id')
  .get(findOne)
  .put(updateOne)
  .delete(deleteById)

//prettier-ignore
characterRouter
  .route('/:id/guild')
  .get(getCharacterGuild)

//export the projects Router
module.exports = characterRouter;
