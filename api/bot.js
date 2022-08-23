require("dotenv").config(); //to start process from .env file

const { Client, GatewayIntentBits, User } = require('discord.js');
const {Routes} = require('discord-api-types/v9')
const { REST } = require('@discordjs/rest');

const mongoose = require('mongoose')
const UserData = require('../api/models/user')
const MessageData = require('../api/models/message')
const DiscordServerData = require('./models/discordserver')

const dbURL = 'mongodb://localhost:27017/surfacebot'
const token = process.env.TOKEN

const client = new Client({ 
  // token: process.env.TOKEN,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ]
});


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('messageCreate', async (msg) => {
  if (msg.author.bot) {
    return
  }
  var guild = await client.guilds.cache.get(msg.guild.id)
  const userDataArray = []

  if(msg.content === '!fixtimes') {
    await guild.members.fetch().then(members => {
      members.forEach(member => {
        if (!member.user.bot) {
          const createUser = UserData.findOneAndUpdate(
            { userID: member.user.id },
            { $inc: { voiceChatTime: 0 } },
            { new: true }
          )
        }
      })
    })
  }

  if(msg.content === '!servercreatethis'){
    const createServer = await DiscordServerData.create({
      serverName: guild.name,
      serverID: guild.id,
      messagesSent: 0,
      memberCount: guild.memberCount
    })
    // creates all the members
    await guild.members.fetch().then(members => {
      members.forEach(member => {
        if (!member.user.bot) {
          const createUser = UserData.create({
            username: member.user.username,
            discriminator: member.user.discriminator,
            userID: member.user.id,
            numberOfMessages: 0,
            messages: [],
            avatar: member.user.avatar,
            banner: member.user.banner,
            accentColor: member.user.accentColor
          })
          userDataArray.push(member.user.id)
        }
      })
    })
    const addUserData = await DiscordServerData.findOneAndUpdate(
      { serverID: guild.id },
      { users: userDataArray },
      { new: true }
    )
  }

  const messageAdd = await UserData.findOneAndUpdate(
    {userID: msg.author.id.toString()},
    {
      $inc: {numberOfMessages: 1},
      $push: { messages:  msg.id}
    },
    { new: true }
  ) 

  const serverAddUp = await DiscordServerData.findOneAndUpdate(
    { serverID: guild.id },
    { $inc: {messagesSent: 1} },
    { new: true }
  )

  const insertMessage = await MessageData.create({
    messageID: msg.id,
    messageContent: msg.content
  })
  console.log(messageAdd, serverAddUp, insertMessage)

});

client.on("guildMemberAdd" ,(member) => {
  console.log(member)
  // if the user exists in another server that is controlled by SurfaceBot
  // if (await User.findbyId) {
  //   const updateUser = await User.findOneAndUpdate(
  //     {userID: member.user.id},
  //     {servers: [...servers, memeber.guild.id]},
  //     { new: true }
  //   )
  // } else {
  //   const createUser = await User.create({
  //     userID: member.user.id,
  //     username: member.user.username,
  //     discriminator: member.user.discriminator,
  //     avatar: member.user.avatar,
  //     banner: member.user.banner,
  //     accentColor: member.user.accentColor,
  //     messages: [],
  //     servers: [member.guild.id]
  //   })
  // }
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  let newUserChannel = newState.channel
  let oldUserChannel = oldState.channel

  if (oldUserChannel === null && newUserChannel !== null) {
    // User Join a voice channel
    // Handle your save when user join in memcache, database , ...
    const addVoiceStart = await UserData.findOneAndUpdate(
      { userID: newState.id },
      { startVoiceTime: Date.now() },
      { new: true }
    )

  } else if (oldUserChannel !== null && newUserChannel === null) {
    // User Leave a voice channel
    // Calculate with previous save time to get in voice time
    const timedata = await UserData.findOne({userID: newState.id}, 'startVoiceTime').exec()
    const delta = Math.floor((Date.now() - timedata.startVoiceTime)/1000)
    console.log(delta)
    const endVoiceStart = await UserData.findOneAndUpdate(
      { userID: newState.id },
      { 
        $inc: { voiceChatTime: delta },
        startVoiceTime: 0
      },
      { new: true }
    )

  } else if (
    oldUserChannel !== null &&
    newUserChannel !== null &&
    oldUserChannel.id != newUserChannel.id
  ) {

    // User Switch a voice channel
    // This is bonus if you want to do something futhermore
 }

})


client.on('error', err => {
  console.warn(err);
});

client.login(token)

mongoose.connect(dbURL, () => {
  console.log('Connected to surfacebot db')
})


// client.on('interactionCreate', async interaction => {
// 	if (!interaction.isChatInputCommand()) return;
// 	const { commandName } = interaction;
// 	if (commandName === 'ping') {
// 		await interaction.reply('Pong!');
// 	} else if (commandName === 'server') {
// 		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
// 	} else if (commandName === 'user') {
// 		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
// 	}
// });
