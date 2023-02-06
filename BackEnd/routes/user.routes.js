const {
  findAll,
  joinGuild,
  leaveGuild,
  createUser,
  deleteUserById,
} = require('../controllers/user.controller');

const express = require('express');

const userRouter = express.Router();

//prettier-ignore
userRouter
  .route('/')
  .post(createUser)
  .get(findAll)

//prettier-ignore
userRouter
  .route('/:id')
  .delete(deleteUserById);

//prettier-ignore
userRouter
  .route('/join')
  .post(joinGuild)

//prettier-ignore
userRouter
  .route('/leave')
  .post(leaveGuild)

module.exports = userRouter;
