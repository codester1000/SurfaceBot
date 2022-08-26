require("dotenv").config(); //to start process from .env file

const { Client, GatewayIntentBits, User } = require('discord.js');
const {Routes} = require('discord-api-types/v9')
const { REST } = require('@discordjs/rest');

const mongoose = require('mongoose')
const UserData = require('../api/models/user')
const MessageData = require('../api/models/message')
const DiscordServerData = require('./models/discordserver')
const InvitesData = require('./models/invites')


const dbURL = process.env.MONGODB_URL
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
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildInvites
  ]
});

const wait = require("timers/promises").setTimeout;

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`)
  await wait(100)
  
  client.guilds.cache.forEach(async (guild) => {

    // Fetch all Guild Invites
    const removeInvite = await InvitesData.deleteMany({ serverID: guild.id.toString() }).exec()
    console.log(removeInvite)
    const firstInvites = await guild.invites.fetch();

    firstInvites.map((invite) => {
      const addInvite = InvitesData.create(
        {
          serverID: invite.guild.id,
          code: invite.code,
          uses: invite.uses,
          member: invite.inviterId
        }
      )
    })

    // Set the key as Guild ID, and create a map which has the invite code, and the number of uses
    
  })
})

client.on('messageCreate', async (msg) => {
  if (msg.author.bot) {
    return
  }
  if (!msg.content) {
    return
  }
  console.log(msg)
  var guild = await client.guilds.cache.get(msg.guild.id)
  const userDataArray = []

  const messageAdd = await UserData.findOneAndUpdate(
    {userID: msg.author.id.toString()},
    {
      $inc: {numberOfMessages: 1},
      $push: { messages:  msg.id}
    },
    { new: true }
  ) 

  const serverAddUp = await DiscordServerData.findOneAndUpdate(
    { serverID: guild.id.toString() },
    { $inc: {messagesSent: 1} },
    { new: true }
  )

  const insertMessage = await MessageData.create({
    messageID: msg.id,
    messageContent: msg.content
  })

});



client.on("inviteDelete", async (invite) => {
  // Delete the Invite from Cache
  const removeInvite = await InvitesData.deleteMany({ code: invite.code }).exec()
  console.log('invite delete', removeInvite)
});

client.on("inviteCreate", async (invite) => {
  // Update cache on new invites
  console.log(invite)
  const addInvite = await InvitesData.create(
    {
      serverID: invite.guild.id,
      code: invite.code,
      users: invite.users
    }
  )
  console.log('invite create', addInvite)

});

client.on("guildMemberAdd", async (member) => {
  const createUser = await UserData.create({
    username: member.user.username,
    discriminator: member.user.discriminator,
    userID: member.user.id,
    serverID: member.guild.id,
    numberOfMessages: 0,
    messages: [],
    avatar: member.user.avatar,
    banner: member.user.banner,
    accentColor: member.user.accentColor,
    voiceChatTime: 0
  })
  const newInvites = await member.guild.invites.fetch()
  const oldInvites = await InvitesData.find({})
  const newInvitesData = newInvites.map(
    async (newInvite) => {
      const oldInvite = await InvitesData.findOne({code: newInvite.code}).exec()
      if (newInvite.uses > oldInvite.uses) {
        console.log(oldInvite.uses)
        const serverID = member.guild.id.toString()
        const updateInviteUses = await InvitesData.findOneAndUpdate(
          { code: newInvite.code, serverID: serverID },
          { $inc: { uses: 1 } },
          { new: true }
        )
        console.log(member.id)
        const userID = oldInvite.member.toString()
        const updateInvites = await UserData.findOneAndUpdate(
          { userID: userID, serverID: serverID },
          { $push: { invitees: member.id } },
          { new: true }
        )
      }
    }
  ) 
});

client.on("guildMemberRemove", async (member) => {
  console.log('this shit', member.user.id, member.guild.id, 'doesnt work')
  userID = member.user.id.toString()
  serverID = member.guild.id.toString()

  const removeServerUser = await UserData.findOneAndDelete(
    {userID: userID, serverID: serverID}
  ).exec()
  console.log(removeServerUser)
})

client.on("guildMemberUpdate", async (member) => {
  userID = member.user.id.toString()
  const updateUsersData = await UserData.findOneAndUpdate(
    { userID: userID },
    {
    username: member.user.username,
    discriminator: member.user.discriminator,
    avatar: member.user.avatar,
    banner: member.user.banner,
    accentColor: member.user.accentColor
    },
    {new: true}
  )
})

client.on('voiceStateUpdate', async (oldState, newState) => {
  let newUserChannel = newState.channel
  let oldUserChannel = oldState.channel

  if (oldUserChannel === null && newUserChannel !== null) {
    // User Join a voice channel
    // Handle your save when user join in memcache, database , ...
    const addVoiceStart = await UserData.findOneAndUpdate(
      { userID: newState.id.toString() },
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
      { userID: newState.id.toString() },
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

// send only moderators to the website and give them access
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;
  // if (!interaction.author.hasPermission("MANAGE_MESSAGES")) {
  //   console.log('working')
  //   return
  // };
  if (commandName === 'dashboard') {
    await interaction.reply('PM Sent')
		await interaction.member.user.send(`localhost:3001/${interaction.member.guild.id}`)
  }
  if (commandName === 'setup') {
    await interaction.reply('Setting up server for you!')
    var guild = await client.guilds.cache.get(interaction.member.guild.id)
    userDataArray = []
    const createServer = await DiscordServerData.create({
      serverName: interaction.member.guild.name,
      serverID: interaction.member.guild.id,
      messagesSent: 0,
      memberCount: guild.memberCount
    })
    // creates all the members
    await interaction.member.guild.members.fetch().then(members => {
      members.forEach(member => {
        if (!member.user.bot) {
          const createUser = UserData.create({
            username: member.user.username,
            discriminator: member.user.discriminator,
            userID: member.user.id,
            serverID: interaction.member.guild.id,   
            numberOfMessages: 0,
            messages: [],
            avatar: member.user.avatar,
            banner: member.user.banner,
            accentColor: member.user.accentColor,
            voiceChatTime: 0,
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
})


client.on('error', err => {
  console.warn(err);
});

client.login(token)

mongoose.connect(dbURL, () => {
  console.log('Connected to surfacebot db')
})
