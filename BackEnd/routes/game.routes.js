const {
  create,
  findOne,
  findAll,
  updateOne,
  deleteById,
  findOneGamesGuilds,
  findOneGamesUsers,
} = require('../controllers/game.controller');

const express = require('express');

const gameRouter = express.Router();

//prettier-ignore
gameRouter
  .route('/')
  .post(create)
  .get(findAll)

//prettier-ignore
gameRouter
  .route('/:id')
  .post(findOne);

module.exports = gameRouter;
