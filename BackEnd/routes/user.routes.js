const { joinGuild, leaveGuild } = require('../controllers/user.controller');

const express = require('express');

const userRouter = express.Router();

//prettier-ignore
userRouter
  .route('/join')
  .post(joinGuild)

//prettier-ignore
userRouter
  .route('/leave')
  .post(leaveGuild)

module.exports = userRouter;
