require("dotenv").config(); //to start process from .env file

const { Client, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');

const mongoose = require('mongoose')
const User = require('../api/models/user')
const Message = require('../api/models/message')


const client = new Client({ 
  // token: process.env.TOKEN,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ]
});


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
});

client.on('messageCreate', async (msg) => {
  if (msg.author.bot) {
    return
  }
  console.log(msg)
  newMessage = {
    ID: msg.id,
    messageContent: msg.content
  }
  // const update = await User.findOneAndUpdate(
  //   {userID: msg.author.id},
  //   {
  //     messages: [msg.id, messages]
  //   },
  //   { new: true }
  // )
  // console.log(newMessage)

  // const insertMessage = await Message.insertOne(newMessage)

})

client.on('error', err => {
  console.warn(err);
});

client.login(process.env.TOKEN)



