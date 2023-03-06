const {
  findAll,
  signupUser,
  joinGuild,
  leaveGuild,
  deleteUserById,
} = require('../controllers/user.controller');

const express = require('express');

const userRouter = express.Router();

//prettier-ignore
userRouter
  .route('/signup')
  .post(signupUser);

//prettier-ignore
userRouter
  .route('/')
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
