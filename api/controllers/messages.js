const express = require("express");

const messageRouter = express.Router();
const MessageData = require("../models/message");

messageRouter.get("/", async (req, res) => {
  const servers = await MessageData.find({}).exec();
  res.status(200).json(servers);
});

messageRouter.get("/surrounding/:messageID", async (req, res) => {
  try {
    const targetMessageId = req.params.messageID;
    const targetMessage = await MessageData.findOne({
      messageID: targetMessageId,
    });
    if (!targetMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    const messagesBefore = await MessageData.find({
      date: { $lt: targetMessage.date },
    })
      .sort({ date: -1 })
      .limit(3);

    const messagesAfter = await MessageData.find({
      date: { $gt: targetMessage.date },
    })
      .sort({ date: 1 })
      .limit(3);

    const surroundingMessages = {
      before: messagesBefore,
      target: targetMessage,
      after: messagesAfter,
    };

    res.status(200).json(surroundingMessages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = messageRouter;
