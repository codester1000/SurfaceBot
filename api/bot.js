require("dotenv").config(); //to start process from .env file

const { Client, GatewayIntentBits, User } = require('discord.js');
const {Routes} = require('discord-api-types/v9')
const { REST } = require('@discordjs/rest');

const mongoose = require('mongoose')
const UserData = require('../api/models/user')
const MessageData = require('../api/models/message')
const DiscordServerData = require('./models/discordserver')
const InvitesData = require('./models/invites')


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
    const removeInvite = await InvitesData.deleteMany({ serverID: guild.id }).exec()
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
    { serverID: guild.id },
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
        const updateInviteUses = await InvitesData.findOneAndUpdate(
          { code: newInvite.code, serverID: member.guild.id },
          { $inc: { uses: 1 } },
          { new: true }
        )
        console.log(member.id)
        const updateInvites = await UserData.findOneAndUpdate(
          { userID: oldInvite.member, serverID: member.guild.id },
          { $push: { invitees: member.id } },
          { new: true }
        )
      }
    }
  ) 
});

client.on("guildMemberRemove", async (member) => {
  console.log('this shit', member.user.id, member.guild.id, 'doesnt work')
  const removeServerUser = await UserData.findOneAndDelete(
    {userID: member.user.id, serverID: member.guild.id}
  ).exec()
  console.log(removeServerUser)
})

client.on("guildMemberUpdate", async (member) => {
  const updateUsersData = await UserData.findOneAndUpdate(
    { userID: member.user.id },
    {
    username: member.user.username,
    discriminator: member.user.discriminator,
    avatar: member.user.avatar,
    banner: member.user.banner,
    accentColor: member.user.accentColor,
    voiceChatTime: 0
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

// send only moderators to the website and give them access
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;
  // if (!interaction.author.hasPermission("MANAGE_MESSAGES")) {
  //   console.log('working')
  //   return
  // };
  if (commandName === 'dashboard') {
    console.log(interaction.member)
    console.log(interaction.member.guild.id)
    await interaction.reply('PM Sent')
		await interaction.member.user.send(`localhost:3001/${interaction.member.guild.id}`)
  }
  if (commandName === 'serverSetup') {
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
            serverID: msg.guild.id,   
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

  // if(msg.content === '!serverfix'){
  //   const createServer = await DiscordServerData.create({
  //     serverName: guild.name,
  //     serverID: guild.id,
  //     messagesSent: 0,
  //     memberCount: guild.memberCount
  //   })
  //   // creates all the members
  //   await guild.members.fetch().then(members => {
  //     members.forEach(member => {
  //       if (!member.user.bot) {
  //         const createUser = UserData.create({
  //           username: member.user.username,
  //           discriminator: member.user.discriminator,
  //           userID: member.user.id,
  //           serverID: msg.guild.id,   
  //           numberOfMessages: 0,
  //           messages: [],
  //           avatar: member.user.avatar,
  //           banner: member.user.banner,
  //           accentColor: member.user.accentColor,
  //           voiceChatTime: 0,
  //         })
  //         userDataArray.push(member.user.id)
  //       }
  //     })
  //   })
  //   const addUserData = await DiscordServerData.findOneAndUpdate(
  //     { serverID: guild.id },
  //     { users: userDataArray },
  //     { new: true }
  //   )
  // }

  // reset server
  //   if(msg.content === '!serverfix'){
  //   const createServer = await DiscordServerData.create({
  //     serverName: guild.name,
  //     serverID: guild.id,
  //     messagesSent: 0,
  //     memberCount: guild.memberCount
  //   })
  //   // creates all the members
  //   await guild.members.fetch().then(members => {
  //     members.forEach(member => {
  //       if (!member.user.bot) {
  //         const createUser = UserData.create({
  //           username: member.user.username,
  //           discriminator: member.user.discriminator,
  //           userID: member.user.id,
  //           serverID: msg.guild.id,   
  //           numberOfMessages: 0,
  //           messages: [],
  //           avatar: member.user.avatar,
  //           banner: member.user.banner,
  //           accentColor: member.user.accentColor,
  //           voiceChatTime: 0,
  //         })
  //         userDataArray.push(member.user.id)
  //       }
  //     })
  //   })
  //   const addUserData = await DiscordServerData.findOneAndUpdate(
  //     { serverID: guild.id },
  //     { users: userDataArray },
  //     { new: true }
  //   )
  // }