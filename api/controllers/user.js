const express = require("express");

const UserData = require("../models/user");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const users = await UserData.find({}).exec();
  res.status(200).json(users);
});

userRouter.get("/byServerUser/:serverID/:userID", async (req, res) => {
  const user = await UserData.findOne({
    userID: req.params.userID,
    serverID: req.params.serverID,
  }).exec();
  res.status(200).json(user);
});

module.exports = userRouter;
