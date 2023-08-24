const express = require("express");
const { update } = require("../models/discordserver");

const discordServerRouter = express.Router();
const DiscordServerData = require("../models/discordserver");

discordServerRouter.get("/", async (req, res) => {
  const servers = await DiscordServerData.find({}).exec();
  res.status(200).json(servers);
});

// update at a later date
discordServerRouter.put("/:serverID", async (req, res) => {
  const updateChannels = await DiscordServerData.findOneAndUpdate(
    { serverID: req.params.serverID },
    { casualChannels: req.body.casual, contentChannels: req.body.content },
    { new: true }
  ).exec();
  res.status(200).json(updateChannels);
});

module.exports = discordServerRouter;
